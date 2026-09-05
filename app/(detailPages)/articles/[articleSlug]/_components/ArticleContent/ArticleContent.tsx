import React from 'react'
import styles from "./ArticleContent.module.scss";
import Image from 'next/image';
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import { IArticleForm1 } from '@/constants/article.interfaces';
import { formatDateTime, isDateTimeSame } from '@/utils/helperFunctions';
import DOMPurify from 'isomorphic-dompurify';
import EditLink from './EditLink';

// TipTap's Youtube extension emits <iframe>, which DOMPurify strips by default
const SANITIZE_CONFIG = {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'target']
};

const ArticleContent = ({ article }: { article: IArticleForm1 }) => {
    const html = DOMPurify.sanitize(article?.content ?? '', SANITIZE_CONFIG);
    return (
        <div className={styles['article-container']}>
            {
                article?.status !== "EDITED" &&
                <EditLink slug={article?.slug ?? ""} authorId={article?.author?._id ?? ""} />
            }

            <h1><strong>{article?.title}</strong></h1>

            <p className={styles['hero-subtitle']}>
                {article?.excerpt}
            </p>

            <div className={styles['content-metadata']}>

                <div className={styles['user-info']}>
                    <div className={styles['user-img-left']}>
                        <Image src={article?.author?.avatar ?? "/background.png"} fill alt="Author Image" loading="eager" />
                    </div>

                    <div className={styles['user-right']}>
                        <div>by <b>{article?.author?.username}</b></div>
                        <div>
                            {formatDateTime(article?.createdAt ?? "", null, true)}
                            {!isDateTimeSame(article?.createdAt ?? "", article?.updatedAt ?? "") ? ` ● Edited ${formatDateTime(article?.updatedAt ?? "", null, true)}` : ""}</div>
                    </div>
                </div>

                <div className={styles['content-reactions']}>
                    <SVGWithText value="English" type='language' />
                    <div>|</div>
                    <SVGWithText value={article?.likes} type='heart' height={16} width={16} />
                    <div>|</div>
                    <SVGWithText height={16} width={16} value={article?.bookmarks} type='bookmark' />
                </div>

            </div>

            <div className={styles['article-thumbnail']}>
                <Image src={article?.coverImage} fill alt={"username"} loading="eager" />
            </div>

            <div
                className={styles['article-body']}
                dangerouslySetInnerHTML={{ __html: html }}
            />






            {/* content design tags */}
            <h1>H1 Design</h1>
            <h2>H2 Design</h2>
            <h3>H3 Design</h3>
            <h4>H4 Design</h4>
            <h5>H5 Design</h5>
            <h6>H6 Design</h6>

            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eius quis nisi dolorem consequatur beatae veniam, in, natus ea commodi id, officia velit rem aut aspernatur totam ducimus hic et.</p>

            <figure className={styles.verseFigure}>
                <blockquote className={styles.sanskritVerse}>
                    <p className={styles['content-shloka']} lang="sa">
                        कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।
                    </p>

                    <p className={styles.translation}>
                        You have a right to action alone, never to its fruits.
                    </p>
                </blockquote>

                <figcaption className={styles['reference-source']}>
                    <cite>- Bhagavad Gītā 2.47</cite>
                </figcaption>
            </figure>

            <figure className={styles.figure}>
                <div className={styles.imageWrapper}><Image src="/background.png" alt="" fill /></div>
                <figcaption className={styles.caption}>Ancient Vedanta manuscript preserved in the Sarasvati Mahal Library.</figcaption>
            </figure>

            <figure className={styles.figure}>
                <div className={styles.imageWrapperSmall}><Image src="/background.png" alt="" fill /></div>
                <figcaption className={styles.caption}>Ancient Vedanta manuscript preserved in the Sarasvati Mahal Library.</figcaption>
            </figure>
        </div>
    )
}

export default ArticleContent