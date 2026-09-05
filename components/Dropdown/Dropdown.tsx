"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from "./Dropdown.module.scss";
import SVG from '../SVG/SVG';
import Input from '../Input/Input';
import { createPortal } from "react-dom";
import { SVGType } from '@/constants/types';

/*
    Portal -> overflow:hidden breaks dropdowns. -> We'll build <body> Dropdown instead of Card Dropdown using createPortal()
    getBoundingClientRect() -> Space below = window.innerHeight - trigger.bottom -> spaceBelow > dropdownHeight -> Open below
    When user scrolls -> Trigger -> dropdown should move with it. -> window.addEventListener("scroll"), resize, why useLayoutEffect is sometimes preferred over useEffect
    Click Outside -> document.addEventListener("mousedown") -> Keyboard -> Enter, Esc, Tab, Accessibility.

    Syntax -> createPortal(JSX, DOMNode) -> createPortal(<div>Hello</div>, document.body) 
    Why useLayoutEffect? -> Browser paints then usEffect runs -> DOM ready then Layout Effect then Measure then Position then Paint -> This is exactly what useLayoutEffect is designed for: reading layout and synchronously updating it before the browser paints.
*/

const Dropdown = ({ dropdownList, onOptionSelect, selectedValue, placeholder, type = "default", title, selectedTags = [], onTagRemove, allowCustomTags = false, iconType }:
    {
        dropdownList: { key: string | number, text: string | number }[],
        onOptionSelect: (value: string | number) => void,
        selectedValue: string | number,
        placeholder?: string,
        /* "tagsinput" -> the trigger is an Input instead of a static box: focus opens the list, typing filters it, Enter selects the raw text. */
        type?: "default" | "tagsinput",
        title?: string,
        /* tagsinput only -> already picked tags, rendered as removable chips and hidden from the list. */
        selectedTags?: string[],
        onTagRemove?: (value: string) => void,
        /* tagsinput only -> Enter adds free text that is not in dropdownList. Off unless the parent opts in. */
        allowCustomTags?: boolean,
        iconType?: SVGType
    }) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0, width: 0 });

    const isTagsInput = type === "tagsinput";
    const visibleList = isTagsInput
        ? dropdownList.filter((el) =>
            !selectedTags.includes(el.key.toString()) &&
            el.text.toString().toLowerCase().includes(query.trim().toLowerCase()))
        : dropdownList;

    const calculatePosition = () => {
        // const rect = triggerRef.current!.getBoundingClientRect(); // Optional Chaining (?.) -> If current exists -> Call function -> Else Return undefined -> Very safe.
        // Non-null Assertion (!) -> means Dear TypeScript, I KNOW this is not null. Trust me. -> it only suppresses TypeScript's warning.
        const trigger = triggerRef.current;
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        // const spaceBelow = window.innerHeight - rect.bottom;
        // const spaceAbove = rect.top;
        setMenuPosition({ left: rect.left, top: rect.bottom + 6, width: rect.width });
    }

    const openDropdown = () => {
        if (isOpen) return;
        calculatePosition();
        setIsOpen(true);
    };

    const toggleDropdownOpen = () => {
        if (!isOpen) {
            calculatePosition(); // set list position
        }
        setIsOpen(prev => !prev);
    };

    const selectOption = (value: string | number) => {
        onOptionSelect(value);
        setQuery("");
        setIsOpen(false);
    }

    /* Enter -> free text is only accepted when the parent allows it, otherwise it must match an option in the list. */
    const selectTypedTag = (typed: string) => {
        const cleaned = typed.trim();
        if (!cleaned) return;

        const match = dropdownList.find((el) => el.text.toString().toLowerCase() === cleaned.toLowerCase());
        if (match) {
            selectOption(match.key);
            return;
        }

        if (!allowCustomTags) return;
        selectOption(cleaned);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            setIsOpen(false);
        }
    }

    function handleOutsideClick(event: MouseEvent) {
        /*
            (<div id="dropdown">
                <div>India</div>
            </div>)
            dropdown.contains(indiaDiv), dropdown.contains(buttonOutside)
        */

        /*
            Click -> Inside Trigger? -> YES -> Ignore -> Click -> Inside Menu? -> YES -> Ignore Otherwise -> Close
        */
        const target = event.target as Node;
        if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;

        /*
            Notice -> contains() works for Trigger -> Everything inside trigger and Menu + Every option
        */
        setIsOpen(false);
    }

    useEffect(() => {
        if (!isOpen) return;

        window.addEventListener("resize", calculatePosition);
        window.addEventListener("scroll", calculatePosition, true);
        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleKeyDown)
        /* Why "mousedown" and not "click"? -> mousedown -> focus changes -> mouseup -> click -> If you wait for click -> sometimes focus has already moved. -> This creates weird bugs. */

        return () => {
            window.removeEventListener("resize", calculatePosition);
            window.removeEventListener("scroll", calculatePosition, true);
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleKeyDown);
        };

    }, [isOpen]);

    return (
        <div className={styles["dropdown-container"]}>
            {
                isTagsInput
                    /* Input owns the text, the wrapper only listens: focus (it bubbles in React) opens the list. */
                    ?
                    (
                        <div ref={triggerRef} onFocus={openDropdown} onClick={openDropdown}>
                            <Input
                                title={title}
                                placeholder={placeholder}
                                value={query}
                                onInputChange={(val) => setQuery(val?.toString() ?? "")}
                                onEnter={(val) => selectTypedTag(val)}
                                iconType={iconType}
                            />
                        </div>
                    )
                    :
                    (
                        <div className={styles["dropdown-content"]} ref={triggerRef} onClick={toggleDropdownOpen}>
                            <span className={styles["dropdown-name"]}>{iconType && <SVG type={iconType} height={20} width={20} />} {dropdownList.find((el) => el.key === selectedValue)?.text || placeholder}</span>
                            <SVG type="chevron-down" height={16} width={16} />
                        </div>
                    )
            }
            {
                isOpen &&
                createPortal(
                    <ul className={styles["dropdown-list"]}
                        ref={menuRef}
                        style={{ left: menuPosition.left, top: menuPosition.top, width: menuPosition.width }}
                    >
                        {
                            isTagsInput && visibleList.length === 0 &&
                            <li className={styles["dropdown-item"]}>No matching tags</li>
                        }
                        {
                            visibleList.map((el) => (
                                <li
                                    onClick={() => selectOption(el.key)}
                                    key={el.key} title={el?.text?.toString()}
                                    className={selectedValue === el.key ? styles["dropdown-item-active"] : styles["dropdown-item"]}>
                                    {el.text}
                                </li>
                            ))
                        }
                    </ul>, document.body
                )
            }
            {
                isTagsInput && selectedTags.length > 0 &&
                <ul className={styles["tags-all"]}>
                    {
                        selectedTags.map((tag) => (
                            <li onClick={() => onTagRemove?.(tag)} key={tag} className={styles["tag"]}>
                                {tag}
                                <SVG type="cross" height={12} width={12} />
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}

export default Dropdown
