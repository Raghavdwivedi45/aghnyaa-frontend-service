"use client";

import React from 'react';
import { IBookIndexChapters } from '@/constants/interfaces'
import styles from "./ChapterDetails.module.scss";
import { bookIndexChapters } from '@/constants/MOCK_DATA'
import SVG from '@/components/SVG/SVG';
import Link from 'next/link';

const ChapterDetails = ({ bookSlug }: { bookSlug: string }) => {
    return (
        <ul className={styles['chapter-details-container']}>
            {
                bookIndexChapters.map((chapter: IBookIndexChapters, idx: number) => (
                    <li key={idx} className={styles['chapter-details']} onClick={() => { }}>
                        <div className={styles["left-chapter-number"]}>{idx < 9 ? "0" : ""}{idx + 1}</div>
                        <div className={styles["chapter-detail"]}>
                            <div>{chapter?.title}</div>
                            <div className={styles["verse-count"]}>Verse Count: {chapter.verseCount}</div>
                        </div>
                        <div className={styles["action-button"]}>
                            <div className={styles["action-button-circumference"]}>
                                <Link href={`/books/${bookSlug}/chapter/${chapter?.slug}`}>
                                    <SVG type='chevron-right' height={20} width={20} color='var(--border)' />
                                </Link>
                            </div>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default ChapterDetails