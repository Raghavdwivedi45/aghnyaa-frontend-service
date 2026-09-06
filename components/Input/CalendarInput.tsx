"use client"

import React, { useRef, useState } from "react";
import styles from "./Input.module.scss";
import SVG from '../SVG/SVG';
import { createPortal } from "react-dom";
import { formatDateTime } from "@/utils/helperFunctions";

const CalendarInput = ({ placeholder, value, onInputChange, title, necessaryInput, disabled }: {
    onInputChange?: (val: number) => void,
    value: number | null;
    placeholder?: string;
    title?: string | number;
    necessaryInput?: boolean,
    disabled?: boolean
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
    const [currentMonth, setCurrentMonth] = useState(value ? new Date(value) : new Date());
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedDate = value ? new Date(value) : null;

    const generateCalendarDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days: (Date | null)[] = [];

        for (let i = 0; i < firstDay; i++) { days.push(null); }
        for (let day = 1; day <= daysInMonth; day++) { days.push(new Date(year, month, day)); }
        return days;
    };

    const goToPreviousMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    const handleDateSelect = (date: Date) => {
        onInputChange?.(date.getTime())
        setIsOpen(false);
    };

    const isSelected = (date: Date) => {
        if (!selectedDate) return false;
        return (date.getDate() === selectedDate.getDate() && date.getMonth() === selectedDate.getMonth() && date.getFullYear() === selectedDate.getFullYear());
    };

    const isToday = (date: Date) => {
        const today = new Date();
        return (date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear());
    };

    const openCalendar = () => {
        setIsOpen(true);
        setCurrentMonth(value ? new Date(value) : new Date());
        const trigger = containerRef.current;
        if (!trigger) return;
        const rect = trigger.getBoundingClientRect();
        setMenuPosition({ left: rect.left, top: rect.bottom - 24 });
    }

    const monthName = currentMonth.toLocaleString("default", { month: "long" });

    return (
        <div className={isOpen ? styles['label-active'] : styles['label']}>

            {
                title &&
                <label className={styles['label-title']} htmlFor="input-id">
                    {title}
                    {necessaryInput && <span className={styles['necessary-mark']}> *</span>}
                </label>
            }

            <div ref={containerRef} className={(isOpen || disabled) ? styles['input-container-active'] : styles['input-container']}>
                <SVG type="calendar" color="var(--text)" />
                <input
                    className={styles["input-box"]}
                    id="input-id"
                    type="text"
                    value={value ? formatDateTime(new Date(value), null, true) : ""}
                    readOnly
                    onClick={openCalendar}
                    placeholder={placeholder || "Select date"}
                    onBlur={() => setIsOpen(false)}
                />

                {
                    isOpen && createPortal(
                        <div className={styles.calendar} style={{ left: menuPosition.left, top: menuPosition.top }} onMouseDown={(e) => e.preventDefault()}>
                            <div className={styles.calendarHeader}>
                                <button onClick={goToPreviousMonth}>‹</button>
                                <span>{monthName} {currentMonth.getFullYear()}</span>
                                <button onClick={goToNextMonth}>›</button>
                            </div>

                            <div className={styles.weekdays}>
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (<span key={day}>{day}</span>))}
                            </div>

                            <div className={styles.days}>
                                {generateCalendarDays().map(
                                    (date, index) => (
                                        <button
                                            key={date?.toISOString() ?? `empty-${index}`}
                                            className={date ? [isToday(date) ? styles.today : "", isSelected(date) ? styles.selected : "",].join(" ") : ""}
                                            disabled={!date}
                                            onClick={() => date && handleDateSelect(date)}
                                        >
                                            {date?.getDate()}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                        , document.body
                    )
                }
            </div>

        </div>
    );
};

export default CalendarInput;
