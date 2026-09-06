"use client";

import React, { useContext, useState } from 'react'
import SVG from '@/components/SVG/SVG';
import { bookmarkPublishedArticle, unbookmarkPublishedArticle } from '@/utils/articleAPIs.client';
import styles from "./ArticleCard.module.scss";
import { ToasterContext } from '@/contexts/ToasterContext';

const Bookmark = ({ articleSlug, isInitiallyBookmarked }: { articleSlug: string, isInitiallyBookmarked: boolean }) => {

    const { setErrorList } = useContext(ToasterContext);

    const [isBookmarked, setIsBookmarked] = useState<boolean>(isInitiallyBookmarked ?? false)

    const handleBookmarks = async (value: "bookmark" | "unbookmark", e: any) => {
        if (!value) return;
        e?.preventDefault();

        if (value === "bookmark") {
            const result = await bookmarkPublishedArticle(articleSlug);
            if (result?.error) {
                setErrorList(result?.message)
                return;
            }
            if (result?.data) {
                setIsBookmarked(result?.data?.isBookmarkedByUser)
            }
        }

        if (value === "unbookmark") {
            const result = await unbookmarkPublishedArticle(articleSlug)
            if (result?.error) {
                setErrorList(result?.message)
                return;
            }
            if (result?.data) {
                setIsBookmarked(result?.data?.isBookmarkedByUser)
            }
        }
    }

    return (
        <div onClick={(event) => handleBookmarks(isBookmarked ? "unbookmark" : "bookmark", event)} className={styles["article-icons"]}>
            <SVG type="bookmark" fillColor={isBookmarked ? 'var(--danger)' : ""} height={20} width={20} color='var(--border)' />
        </div>
    )
}

export default Bookmark