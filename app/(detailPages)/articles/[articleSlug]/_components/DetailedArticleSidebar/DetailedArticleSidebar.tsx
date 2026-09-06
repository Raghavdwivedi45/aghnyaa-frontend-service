"use client";

import React, { useContext, useEffect, useState } from 'react';
import styles from "./DetailedArticleSidebar.module.scss";
import ProgressRing from '@/components/ProgressRing/ProgressRing'
import SVG from '@/components/SVG/SVG';
import { unlikePublishedArticle, likePublishedArticle, bookmarkPublishedArticle, unbookmarkPublishedArticle, updateUserHistory, generateArticlePDF } from '@/utils/articleAPIs.client';
import { IDetailedSidebar } from '@/constants/article.interfaces';
import { ToasterContext } from '@/contexts/ToasterContext';

const DetailedArticleSidebar = ({ progress, articleSlug, isLiked, likeOrBookmarkArticle, isBookmarked }: IDetailedSidebar) => {
    if (!articleSlug || !likeOrBookmarkArticle) return null;

    const [amountScrolled, setAmountScrolled] = useState<number>(0);
    const { setSuccessList, setErrorList } = useContext(ToasterContext);

    useEffect(() => {
        const handleScroll = () => {
            const currentProgress = Math.floor(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100)
            setAmountScrolled((maxProgress) => Math.max(maxProgress, currentProgress));
            // this notifies us when the user scrolled to 70% of page length -> after that, the read progress won't reduce even if user scrolls to the top
            // this tells us how much of this article user has already read
        };
        
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const updateHistory = async () => {
            await updateUserHistory(articleSlug);
        }
        updateHistory();
    }, [articleSlug]);

    const handleLikes = async (value: "Like" | "Dislike") => {
        if (!value) return;

        if (value === "Like") {
            const result = await likePublishedArticle(articleSlug)
            likeOrBookmarkArticle?.("likes", result?.data?.likes ?? 0, result?.data?.isLikedByUser ?? true)
            if (result?.error) {
                setErrorList(result?.message);
                return;
            }
            setSuccessList(result?.message)
        }

        if (value === "Dislike") {
            const result = await unlikePublishedArticle(articleSlug)
            likeOrBookmarkArticle?.("likes", result?.data?.likes ?? 0, result?.data?.isLikedByUser ?? false)
            if (result?.error) {
                setErrorList(result?.message);
                return;
            }
            setSuccessList(result?.message);
        }
    }

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setSuccessList("Link copied successfully")
        } catch (error) {
            console.error("Failed to copy link:", error);
        }
    }

    const scrollToTop = () => {
        if (window.scrollY <= 0) return;
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleBookmarks = async (value: "bookmark" | "unbookmark") => {
        if (!value) return;

        if (value === "bookmark") {
            const result = await bookmarkPublishedArticle(articleSlug)
            if (result?.error) {
                setErrorList(result?.message)
                return;
            }
            if (result?.data) {
                setSuccessList(result?.message)
                likeOrBookmarkArticle?.("bookmarks", result?.data?.bookmarks ?? 0, result?.data?.isBookmarkedByUser ?? true)
            }
        }

        if (value === "unbookmark") {
            const result = await unbookmarkPublishedArticle(articleSlug)
            if (result?.error) {
                setErrorList(result?.message)
                return;
            }
            if (result?.data) {
                setSuccessList(result?.message)
                likeOrBookmarkArticle?.("bookmarks", result?.data?.bookmarks ?? 0, result?.data?.isBookmarkedByUser ?? false)
            }
        }
    }

    const generatePDF = async () => {
        const message = await generateArticlePDF(articleSlug);
        if (message) {
            setSuccessList(message)
        }
    }

    return (
        <>
            <div title={`${progress}%`} className={styles["content-progress"]}>
                <ProgressRing size={24} progress={amountScrolled} color="var(--button-primary-text)" />
                <p className={styles["progress-text"]}>Read</p>
                <p>{amountScrolled}%</p>
            </div>

            <div className={styles["horizontal-line"]}></div>

            <div onClick={generatePDF} className={styles["content-progress"]}>
                <span className={styles["sidebar-icon-container"]}>
                    <SVG type="document" height={20} width={20} color='var(--border)' />
                </span>
                <p className={styles["progress-text"]}>PDF</p>
            </div>

            <div onClick={() => handleBookmarks(isBookmarked ? "unbookmark" : "bookmark")} className={styles["content-progress"]}>
                <span className={styles["sidebar-icon-container"]}>
                    <SVG type="bookmark" fillColor={isBookmarked ? 'var(--danger)' : ""} height={20} width={20} color='var(--border)' />
                </span>
                <p className={styles["progress-text"]}>Bookmark</p>
            </div>

            <div onClick={handleShare} className={styles["content-progress"]}>
                <span className={styles["sidebar-icon-container"]}>
                    <SVG type="share" fillColor='var(--danger)' height={20} width={20} color='var(--border)' />
                </span>
                <p className={styles["progress-text"]}>Share</p>
            </div>

            <div onClick={() => handleLikes(isLiked ? "Dislike" : "Like")} className={styles["content-progress"]}>
                <span className={styles["sidebar-icon-container"]}>
                    <SVG type={isLiked ? "filledHeart" : "heart"} fillColor='var(--danger)' height={20} width={20} color='var(--border)' />
                </span>
                <p className={styles["progress-text"]}>Love</p>
            </div>

            <div className={styles["horizontal-line"]}></div>

            <div onClick={scrollToTop} className={styles["content-progress"]}>
                <span title='Scroll to top' className={styles["sidebar-icon-container"]}>
                    <SVG type="upArrowWithBorder" height={24} width={24} color='var(--border)' />
                </span>
                <p className={styles["progress-text"]}>Scroll</p>
            </div>

        </>
    )
}

export default DetailedArticleSidebar