import React from 'react';
import styles from "./ArticlePageExtras.module.scss";
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import Image from 'next/image';
import CreateNewButton from '../CreateNewButton';
import { fetchTopPerformers } from '@/utils/articleAPIs';
import Link from 'next/link';

const ArticlePageExtras = async () => {
    const data = await fetchTopPerformers();

    return (
        <div className={styles['extras-container']}>
            <CreateNewButton type="Article" />
            <div className={styles["card-container"]}>
                <h4>
                    <SVGWithText type='searchNetwork' value='Explore By Topic' height={24} width={24} />
                </h4>
                {
                    data?.top3Categories.map((categoryEach, idx) => {
                        return (
                            <div key={idx} className={styles["topic-count-pair"]}>
                                <p title={categoryEach.category} className={styles["category-name"]}>{categoryEach.category}</p>
                                <p className={styles["topic-count"]}>{categoryEach.count}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div className={styles["card-container-2"]}>
                <h4>
                    <SVGWithText type='fire' value='Trending Now' height={16} width={16} />
                </h4>
                {
                    data?.top3LikedArticles.map((article, idx) => {
                        return (
                            <Link key={idx} className={styles["trending-link"]} href={`articles/${article?.slug}`}>
                                <div title={article?.title ?? ""} className={styles['trending-card']}>
                                    <div className={styles["trending-card-img"]}>
                                        <Image src={article?.coverImage ?? "/background.png"} alt='' fill />
                                    </div>
                                    <h4 className={styles["trending-card-title"]}>{article?.title ?? ""}</h4>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ArticlePageExtras