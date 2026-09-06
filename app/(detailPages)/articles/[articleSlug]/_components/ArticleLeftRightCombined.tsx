"use client";

import React, { useContext, useState } from 'react';
import styles from "../page.module.scss";
import DetailedArticleSidebar from './DetailedArticleSidebar/DetailedArticleSidebar';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import ArticleContent from './ArticleContent/ArticleContent';
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import Accordion from '@/components/Accordion/Accordion';
import Comments from '@/components/Comments/Comments';
import { IArticleForm1, IComment } from '@/constants/article.interfaces';
import { IBreadCrumb } from '@/constants/interfaces';
import { initialPayload } from '@/constants/article.constants';
import AddComment from '@/components/Comments/AddComment';
import { formatDateTime } from '@/utils/helperFunctions';
import { AuthContext } from '@/contexts/AuthContext';

const ArticleLeftRightCombined = ({ article, comments }: { article: IArticleForm1, comments: IComment[] | null }) => {

    const [articleInfo, setArticleInfo] = useState<IArticleForm1>(article ?? initialPayload)
    const [isBookmarkedByUser, setIsBookmarkedByUser] = useState<boolean>(article?.isBookmarkedByUser ?? false)
    const [isLikedByUser, setIsLikedByUser] = useState<boolean>(article?.isLikedByUser ?? false);

    const { user } = useContext(AuthContext);

    const breadcrumbArray: IBreadCrumb[] = articleInfo ? [
        { route: "/articles", text: "Articles" },
        { route: `/articles/${article?.slug ?? ""}`, text: articleInfo?.title }
    ] : [];

    const likeOrBookmarkArticle = (key: "likes" | "bookmarks", count: number, state: boolean) => {
        if (key !== "likes" && key !== "bookmarks") return;
        if (typeof count !== "number" || typeof state !== "boolean") return

        setArticleInfo((prev) => ({ ...prev, [key]: count }));
        if (key === "likes") setIsLikedByUser(state);
        if (key === "bookmarks") setIsBookmarkedByUser(state);
    }


    return (
        <div className={styles["page-left"]}>
            <div className={styles["page-content-sidebar"]}>
                <DetailedArticleSidebar likeOrBookmarkArticle={likeOrBookmarkArticle} isBookmarked={isBookmarkedByUser} isLiked={isLikedByUser} articleSlug={article?.slug ?? ""} progress={25} />
            </div>

            <div className={styles["page-content-main-container"]}>
                <BreadCrumbs breadcrumbArray={breadcrumbArray} />

                <div className={styles["page-content-main"]}>
                    <ArticleContent article={articleInfo} />

                    <div className={styles["article-tags"]}>
                        {
                            articleInfo?.tags?.map((tag, idx) => (
                                <SVGWithText key={idx} withDesign={true} index={idx} value={tag} />
                            ))
                        }
                    </div>
                </div>

                <Accordion additionalIcon='comment' heading='Comments'>
                    <AddComment myComment={comments?.find((comment) => comment?.commentBy?._id === user?._id) ?? null} slug={article?.slug} />

                    {
                        comments?.filter(comment => comment?.commentBy?._id !== user?._id)?.map((comment, idx) => <Comments key={idx} username={comment?.commentBy?.username} createdAt={formatDateTime(comment?.createdAt)} commentContent={comment?.comment} />)
                    }
                </Accordion>
            </div>
        </div>
    )
}

export default ArticleLeftRightCombined