import React from 'react';
import styles from "./Toggle.module.scss";

const Toggle = ({ label, isToggledOn, onToggleUpdate, description }: { label: string, isToggledOn: boolean, onToggleUpdate: () => void, description?: string }) => {
    return (
        <div className={styles['toggle-container-top']}>
            <div className={styles['toggle-container']}>
                <label onClick={onToggleUpdate} htmlFor="">{label}</label>
                <button onClick={onToggleUpdate} className={`${styles["toggle-button"]} ${isToggledOn ? styles.on : ""}`}></button>
            </div>
            {description && (<div className={styles['toggle-container-label']}>{description}</div>)}
        </div>
    )
}

export default Toggle