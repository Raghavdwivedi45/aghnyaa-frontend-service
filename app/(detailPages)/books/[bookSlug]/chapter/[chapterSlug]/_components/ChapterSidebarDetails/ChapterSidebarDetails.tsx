"use client";

import React, { useEffect, useState } from 'react';
import styles from "./ChapterSidebarDetails.module.scss";
import { IChapterSidebarDetails } from '@/constants/interfaces';
import Accordion from '@/components/Accordion/Accordion';
import { useParams, useSearchParams } from 'next/navigation';
import { chapterIterator, zeroPrefixedCount } from '@/utils/helperFunctions';
import Link from 'next/link';

const ChapterSidebarDetails = ({ chapterDetails }: { chapterDetails: IChapterSidebarDetails[] }) => {
    const params: { bookSlug: string, chapterSlug: string } = useParams();
    const queryParams = useSearchParams();
    const [activeVerse, setActiveVerse] = useState<number>(1);

    useEffect(() => {
        const verseNumber: number = Number(queryParams?.get('verse') || 1);
        setActiveVerse(verseNumber);
    }, [queryParams]);

    const isActiveVerse = (chapterSlug: string, verseNumber: number) => {
        return params.chapterSlug === chapterSlug && verseNumber === activeVerse
    }

    return (
        <>
            <h2>Contents</h2>

            {
                chapterDetails.map((detail: IChapterSidebarDetails, idx: number) => (
                    <Accordion key={idx} heading={`${zeroPrefixedCount(detail.chapterNumber)} ${detail.title}`}>
                        <ul className={styles["chapter-list"]}>
                            {
                                chapterIterator(detail.totalVerses).map((chapterIndex: number, index: number) => (
                                    <Link key={index} href={`/books/${params.bookSlug}/chapter/${detail.slug}?verse=${chapterIndex}`}>
                                        <li className={isActiveVerse(detail.slug, chapterIndex) ? styles.verseItemActive : styles.verseItem}>
                                            Verse {chapterIndex}
                                            {isActiveVerse(detail.slug, chapterIndex) && <span className={styles.activeDot}>•</span>}
                                        </li>
                                    </Link>
                                ))
                            }
                        </ul>
                    </Accordion>
                ))
            }

        </>
    )
}

export default ChapterSidebarDetails