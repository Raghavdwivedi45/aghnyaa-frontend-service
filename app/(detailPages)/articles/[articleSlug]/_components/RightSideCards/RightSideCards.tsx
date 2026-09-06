import React, { ReactNode } from 'react';
import styles from "./RightSideCards.module.scss";

const RightSideCards = ({ children, heading }: { children: ReactNode, heading: string }) => {
    return (
        <div className={styles['card-container']}>
            <h3>{heading}</h3>

            <div className={styles['card-child-container']}>
                {children}
            </div>
        </div>
    )
}

export default RightSideCards