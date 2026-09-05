import React from 'react';
import styles from "./ChapterDetails2.module.scss";
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import { DetailedBookPageActions } from '@/constants/constants';
import SVG from '@/components/SVG/SVG';

const ChapterDetails2 = () => {
    return (
        <div className={styles["chapter-content"]}>

            <div className={styles["chapter-top"]}>
                <div className={styles["content-left"]}>
                    <SVGWithText withDesign={true} index={4} value="Chapter 2" />
                    <h1>Nature of self</h1>
                </div>
                <div className={styles["content-right"]}>
                    {
                        DetailedBookPageActions.map((action, idx: number) => (
                            <div title={action.value} key={idx} className={styles["icon-container"]}>
                                <SVG height={20} width={20} type={action.type} color="var(--border)" />
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className={styles["chapter-bottom"]}>

                <div className={styles["navigation-bar"]}>
                    <span className={styles['verse-icon']}><SVG type="leftArrow" /></span>
                    <span className={styles['verse-count']}>Verse 22</span>
                    <span className={styles['verse-icon']}><SVG type="rightArrow" /></span>
                </div>

                <div className={styles["verse-content"]}>
                    <div className={styles["original-text"]}>
                        इति सम्प्रश्नसम्पृष्‍टो विप्राणां रौमहर्षणिः।
                        प्रतिपूज्य वचस्तेषां प्रवक्‍तुमुपचक्रमे ॥१/२/१॥
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ChapterDetails2