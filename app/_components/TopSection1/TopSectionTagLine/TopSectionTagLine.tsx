"use client";

import React, { useEffect, useState } from 'react'
import styles from "./TopSectionTagLine.module.scss";
import { sanskritFont } from '@/fonts';;
import { heroTagLines } from '@/constants/constants';

const TopSectionTagLine = () => {

    const [tagLineIndex, setTagLineIndex] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setVisible(false); // Fade out

            setTimeout(() => {
                setTagLineIndex((prev) => (prev + 1) % heroTagLines.length); 
                setVisible(true); // Fade in
            }, 500);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <h1 className={`${sanskritFont.className} ${styles['hero-tag-line']} ${visible ? styles["visible"] : styles["hidden"]}`}>
           <p className={sanskritFont.className}>{heroTagLines[tagLineIndex]}</p>
        </h1>
        
    )
}

export default TopSectionTagLine;