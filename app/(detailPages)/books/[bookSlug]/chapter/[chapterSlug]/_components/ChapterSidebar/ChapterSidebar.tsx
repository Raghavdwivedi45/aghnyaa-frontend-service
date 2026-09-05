"use client";

import React, { useState } from 'react';
import styles from "./ChapterSidebar.module.scss";
import SVG from '@/components/SVG/SVG';
import { chapterSidebarOptions } from '@/constants/constants';
import ChapterSidebarDetails from '../ChapterSidebarDetails/ChapterSidebarDetails';

import { IChapterSidebarDetails } from '@/constants/interfaces';

const ChapterSidebar = ({ chapterContents }: { chapterContents: IChapterSidebarDetails[] }) => {
    const [activeIdx, setActiveIdx] = useState<number>(0);

    const toggleActiveIdx = (idx: number) => {
        setActiveIdx(idx);
    }

    return (
        <div className={styles["chapter-toolbar"]}>
            <div className={styles["sidebar-options"]}>
                {
                    chapterSidebarOptions.map((option, idx) => (
                        <div
                            key={idx}
                            onClick={() => toggleActiveIdx(idx)}
                            title={option?.value}
                            className={activeIdx === idx ? styles["sidebar-left-icon-active"] : styles["sidebar-left-icon"]}
                        >
                            <SVG color={activeIdx === idx ? "var(--text)" : 'var(--border-subtle)'} type={option?.type} />
                        </div>
                    ))
                }
            </div>
            <div className={styles["sidebar-contents"]}>
                {
                    activeIdx === 0 && <ChapterSidebarDetails chapterDetails={chapterContents} />
                }
            </div>
        </div>
    )
}

export default ChapterSidebar