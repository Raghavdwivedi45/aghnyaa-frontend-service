import React from "react";
import styles from "./ProgressRing.module.scss";
import { IProgressRingProps } from "@/constants/interfaces";

const ProgressRing = ({ progress, total = 100, size = 16, strokeWidth = 3, color = "var(--border)", trackColor = "var(--border-light)" }: IProgressRingProps) => {
    // progress represents: - percentage when total is not provided (total defaults to 100) - covered count when total is provided

    const normalizedProgress = total > 0 ? Math.min(100, Math.max(0, (progress / total) * 100)) : 0;

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const strokeDashoffset = circumference - (normalizedProgress / 100) * circumference;

    return (
        <svg
            width={size}
            height={size}
            className={styles["progress-ring-svg"]}
        >
            {/* Background ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={trackColor}
                strokeWidth={strokeWidth}
            />

            {/* Progress ring */}
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={styles["progress-ring"]}
            />
        </svg>
    );
};

export default ProgressRing;