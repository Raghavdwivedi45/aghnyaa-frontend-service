"use client";

import React from 'react'
import styles from "../page.module.scss";

const HeadingList = ({ headingList }: { headingList: string[] }) => {
    if (!headingList) return;

    return (
        <ul className={styles['content-titles']}>
            {
                headingList.map((heading, idx) => (
                    <li key={idx} title={heading} className={`${styles['content-title-li']} ${idx === -1 ? styles['active'] : ""}`}>{heading}</li>
                ))
            }
        </ul>
    )
}

export default HeadingList