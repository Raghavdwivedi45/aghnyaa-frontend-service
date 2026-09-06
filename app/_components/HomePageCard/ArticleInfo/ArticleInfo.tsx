"use client";
import { useEffect, useState } from 'react'
import Image from 'next/image';
import styles from "./ArticleInfo.module.scss";
import ButtonSet from '@/components/ButtonSet/ButtonSet';
import { formatDateTime } from '@/utils/helperFunctions';
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import { IArticleForm1 } from '@/constants/article.interfaces';

const ArticleInfo = ({ currentArticles }: { currentArticles: IArticleForm1[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentArticle = currentArticles[currentIndex];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % currentArticles.length);
        }, 4000);
        // 4 seconds per slide

        // Clear timer when component unmounts
        return () => clearInterval(timer);
    }, [currentArticles?.length]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
    };

    if (!currentArticle) return null;

    return (
        <div className={styles.container}>
            <div className={styles.carouselWrapper}>
                <div className={styles.premiumCard}>
                    {/* Top Bar */}
                    <div className={styles.cardHeader}>
                        <ButtonSet showPrimary={false} secondaryText={currentArticle?.category} />
                    </div>

                    {/* Main Content Area triggering re-animation on key change */}
                    <div className={styles.mainContent} key={currentArticle?._id}>
                        {currentArticle?.coverImage &&
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={currentArticle?.coverImage}
                                    alt={currentArticle?.title}
                                    fill
                                    className={styles.image}
                                />
                            </div>
                        }


                        <h3 title={currentArticle?.title} className={styles.giantTitle}>
                            {currentArticle?.title}
                        </h3>

                        <ButtonSet
                            primaryText='Love' primarySVG='heart' onPrimaryClick={() => { }}
                            secondarySVG='share' secondaryText='Share' onSecondaryClick={() => { }}
                        />
                    </div>


                    <div className={styles.thumbnailArea}>
                        <SVGWithText src={currentArticle?.author?.avatar ?? "/background.png"} height={32} width={32} value={`By ${currentArticle?.author?.username}`} />
                        <SVGWithText type='calendar' height={20} width={20} value={formatDateTime(currentArticle?.createdAt ?? "", null, true)} />
                    </div>

                    {/* Auto-scroll Progress Bars */}
                    <div className={styles.progressContainer}>
                        {
                            currentArticles.map((_, idx: number) => (
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

export default ArticleInfo
