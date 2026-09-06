"use client"

import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import styles from "./Input.module.scss";
import SVG from '../SVG/SVG';
import { SVGType } from '@/constants/types';

const Input = ({ iconType = "", inputType, onInputChange, placeholder, iconSize, title, necessaryInput, isTextArea = false, textAreaProperties = { resize: false, rows: null, columns: null }, maxCharCount, onEnter, value, disabled = false }:
    {
        iconType?: SVGType | "";
        inputType?: "text" | "password" | "email" | "number" | "search";
        onInputChange?: (val: string | number) => void,
        onEnter?: (val: string) => void,
        /* Input is controlled -> the parent owns the text, this only reports changes back. */
        value: string | number;
        placeholder?: string;
        iconSize?: number;
        title?: string | number;
        necessaryInput?: boolean,
        isTextArea?: boolean;
        textAreaProperties?: {
            resize: boolean,
            rows: number | null,
            columns: number | null
        },
        maxCharCount?: number,
        disabled?: boolean
    }) => {

    const [isActive, setIsActive] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const currentType = inputType === "password" ? (showPassword ? "text" : "password") : inputType;
    const currentValue = value?.toString() ?? "";

    const toggleInputFocus = (state: boolean) => {
        setIsActive(state);
    }

    const onInputChanging = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const raw = e?.target?.value;
        if (raw === null || raw === undefined) return;
        const val = maxCharCount ? raw.slice(0, maxCharCount) : raw;
        if (!onInputChange) return;
        onInputChange(val);
    }

    const toggleShowPassword = () => {
        setShowPassword(prev => !prev)
    }

    /* Clearing after Enter is the parent's job now -> it owns the value. */
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== "Enter") return;
        const raw = e.currentTarget?.value?.toString();
        if (raw === null || raw === undefined) return;
        if (!onEnter) return;
        onEnter?.(raw);
    }

    if (isTextArea && !textAreaProperties) return null;
    if (!onEnter && !onInputChange && !disabled) return null;

    return (
        <div className={isActive ? styles['label-active'] : styles['label']}>

            {
                title &&
                <label htmlFor="input-id">
                    {title}
                    {necessaryInput && <span className={styles['necessary-mark']}> *</span>}
                </label>
            }

            {
                !isTextArea &&
                <div onClick={() => toggleInputFocus(true)} className={(isActive || disabled) ? styles['input-container-active'] : styles['input-container']}>

                    {iconType && <SVG height={iconSize} width={iconSize} type={iconType} />}

                    <input
                        disabled={disabled}
                        id="input-id"
                        placeholder={placeholder || ""}
                        onFocus={() => toggleInputFocus(true)}
                        onBlur={() => toggleInputFocus(false)}
                        onChange={(e) => onInputChanging(e)}
                        onKeyDown={(e) => onEnterPress(e)}
                        className={styles['input-box']}
                        type={currentType}
                        value={currentValue}
                        maxLength={maxCharCount}
                    />

                    {
                        inputType === "password" &&
                        (
                            <span onClick={toggleShowPassword}>
                                <SVG height={16} width={16} type={showPassword ? "eye-off" : "eye"} />
                            </span>
                        )
                    }

                </div>
            }


            {
                isTextArea &&
                <div onClick={() => toggleInputFocus(true)} className={(isActive || disabled) ? styles['input-container-active'] : styles['input-container']}>
                    <textarea
                        disabled={disabled}
                        id="input-id"
                        placeholder={placeholder || ""}
                        onFocus={() => toggleInputFocus(true)}
                        onBlur={() => toggleInputFocus(false)}
                        onChange={(e) => onInputChanging(e)}
                        className={styles['input-box']}
                        value={currentValue}
                        maxLength={maxCharCount}
                        rows={textAreaProperties?.rows ?? undefined}
                        cols={textAreaProperties?.columns ?? undefined}
                        style={{
                            resize: textAreaProperties?.resize ? "vertical" : "none",
                        }}
                    />
                </div>
            }

            {
                !!maxCharCount &&
                <div className={styles['character-count']}>
                    {currentValue.length}/{maxCharCount}
                </div>
            }

        </div>
    )
}

export default Input
