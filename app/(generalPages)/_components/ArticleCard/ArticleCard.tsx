import React from 'react';
import styles from "./ArticleCard.module.scss";
import Image from 'next/image';
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import Link from 'next/link';
import { IArticleForm1 } from '@/constants/article.interfaces';
import { formatDateTime } from '@/utils/helperFunctions';
import Bookmark from './Bookmark';

const ArticleCard = ({ article, index }: { article: IArticleForm1, index: number }) => {

    return (
        <Link className={styles['card-container']} href={`articles/${article?.slug ?? ""}`}>
            <div className={styles["article-img"]}>
                <Image src={article?.coverImage ?? ""} fill alt='' />
            </div>
            <div className={styles["article-info-container"]}>
                <div className={styles["article-information"]}>
                    <div className={styles["article-info-box"]}>
                        <h3 title={article?.title ?? ""} className={styles["article-title"]}>{article?.title ?? ""}</h3>

                        <p className={styles["article-description"]}>{article?.excerpt ?? ""}</p>

                        <div className={styles["article-tags"]}>
                            {article.tags?.[0] && <SVGWithText index={index} withDesign={true} value={article?.tags?.[0]} />}
                            {article.tags?.[1] && <SVGWithText index={index + 3} withDesign={true} value={article?.tags?.[1]} />}
                        </div>
                        <p className={styles["article-description"]}>{formatDateTime(article?.createdAt ?? "")}</p>

                    </div>

                    <div className={styles["author-info-box"]}>
                        <SVGWithText value={`by ${article?.author?.username}`} src={article?.author?.avatar ?? "/background.png"} height={24} width={24} />
                    </div>

                </div>
                <Bookmark articleSlug={article?.slug ?? ""} isInitiallyBookmarked={article?.isBookmarkedByUser ?? false} />
            </div>
        </Link>

    )
}

export default ArticleCard