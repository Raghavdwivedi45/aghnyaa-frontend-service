"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from "./Dropdown.module.scss";
import SVG from '../SVG/SVG';
import { createPortal } from "react-dom";
import { SVGType } from '@/constants/types';

const MultiSelectDropdown = ({ dropdownList, onOptionSelect, selectedValues, placeholder, title, iconType }:
    {
        dropdownList: { key: string | number, text: string | number }[],
        onOptionSelect: (value: string | number) => void,
        selectedValues: string[] | number[],
        placeholder?: string,
        title?: string,
        iconType?: SVGType
    }) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLUListElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0, width: 0 });

    const calculatePosition = () => {
        const trigger = triggerRef.current;
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        setMenuPosition({ left: rect.left, top: rect.bottom + 6, width: rect.width });
    }

    const toggleDropdownOpen = () => {
        if (!isOpen) {
            calculatePosition(); // set list position
        }
        setIsOpen(prev => !prev);
    };

    const selectOption = (value: string | number) => {
        setIsOpen(false);
        onOptionSelect(value);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            setIsOpen(false);
        }
    }

    function handleOutsideClick(event: MouseEvent) {
        const target = event.target as Node;
        if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
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
            <div className={styles["dropdown-content"]} ref={triggerRef} onClick={toggleDropdownOpen}>
                <span className={styles["dropdown-name"]}>
                    {iconType && <SVG type={iconType} height={20} width={20} />}{" "}
                    {selectedValues.length > 0
                        ? dropdownList
                            .filter((el) => (selectedValues as (string | number)[]).includes(el.key))
                            .map((el) => el.text)
                            .join(", ")
                        : (title || placeholder)}
                </span>
                <SVG type="chevron-down" height={16} width={16} />
            </div>
            {
                isOpen &&
                createPortal(
                    <ul className={styles["dropdown-list"]}
                        ref={menuRef}
                        style={{ left: menuPosition.left, top: menuPosition.top, width: menuPosition.width }}
                    >
                        {dropdownList.map((option) => {
                            const isSelected = (selectedValues as (string | number)[]).includes(option.key);
                            return (
                                <li
                                    key={option.key}
                                    className={isSelected ? styles["dropdown-item-active"] : styles["dropdown-item"]}
                                    onClick={() => selectOption(option.key)}
                                >
                                    {option.text}
                                </li>
                            );
                        })}
                    </ul>, document.body
                )
            }
        </div>
    )
}

export default MultiSelectDropdown
