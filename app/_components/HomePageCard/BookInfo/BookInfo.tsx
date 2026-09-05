"use client";
import React, { useEffect, useState } from 'react'
import styles from "./BookInfo.module.scss";
import ButtonSet from '@/components/ButtonSet/ButtonSet';
import { IBookInfo } from '@/constants/interfaces';
import { formatDateTime } from '@/utils/helperFunctions';
import SVGWithText from '@/components/SVGWithText/SVGWithText';

const BookInfo = ({ currentBooks }: IBookInfo) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentBook = currentBooks[currentIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % currentBooks.length);
        }, 4000);
        // 4 seconds per slide

        // Clear timer when component unmounts
        return () => clearInterval(timer);
    }, [currentBooks.length]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    /*
        A re-render runs the function body again (the consts, the return JSX).
        But setInterval is inside useEffect, NOT in the plain function body.
        useEffect only runs its code when its deps [currentBooks.length] change.
        A re-render from setCurrentIndex does not change currentBooks.length → so useEffect is skipped → no new interval is created.
    */

    return (
        <div className={styles.container}>
            <div className={styles.carouselWrapper}>
                <div className={styles.premiumCard}>
                    {/* Top Bar */}
                    <div className={styles.cardHeader}>
                        <ButtonSet showPrimary={false} secondaryText={currentBook.tag} />
                    </div>

                    {/* Main Content Area triggering re-animation on key change */}
                    <div className={styles.mainContent} key={currentBook.id}>
                        <h3 title={currentBook.title} className={styles.giantTitle}>
                            {currentBook.title}
                        </h3>

                        <div className={styles.textDetails}>
                            <p className={styles.authorText}>
                                by {currentBook.author}
                            </p>
                            <p className={styles.descriptionText}>
                                {currentBook.description}
                            </p>
                        </div>

                        <SVGWithText type='calendar' height={20} width={20} value={formatDateTime(currentBook.createdAt)} />
                    </div>

                    <div className={styles.thumbnailArea}>
                        <ButtonSet
                            primaryText='Love' primarySVG='heart' onPrimaryClick={() => { }}
                            secondarySVG='share' secondaryText='Share' onSecondaryClick={() => { }}
                        />
                    </div>

                    {/* Auto-scroll Progress Bars */}
                    <div className={styles.progressContainer}>
                        {
                            currentBooks.map((_, idx: number) => (
                                <div
                                    key={idx}
                                    className={`${styles.progressBar} ${idx === currentIndex ? styles.active : ''}`}
                                    onClick={() => handleDotClick(idx)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookInfo