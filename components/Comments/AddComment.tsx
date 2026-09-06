"use client";

import React, { useEffect, useState } from 'react'
import styles from "./Comments.module.scss";
import SVG from '../SVG/SVG';
import { commentArticle } from '@/utils/articleAPIs.client';
import { IComment } from '@/constants/article.interfaces';

const AddComment = ({ slug, myComment }: { slug: string, myComment: IComment | null }) => {

    const [isEditState, setIsEditState] = useState<boolean>(false);

    const [saved, setSaved] = useState<boolean>(!!myComment?.comment || false);
    const [commentText, setCommentText] = useState<string>(myComment?.comment || "");

    useEffect(() => {
        setCommentText(myComment?.comment || "");
        setSaved(!!myComment?.comment);
    }, [myComment?.comment]);

    const onEditedState = () => {
        setIsEditState(true)
    }

    const offEditedState = () => {
        setIsEditState(false)
    }

    const saveComment = async () => {
        if (!commentText) return;

        const result = await commentArticle(slug, commentText);

        if (result?.error) {
            return;
        }
        setSaved(true);
    }
    
    return (
        <div className={styles['comment-container']}>
            <h3 className={styles['comment-header']}>
                {
                    isEditState &&
                    (
                        <>
                            <span title="Cancel" onClick={offEditedState}><SVG height={16} width={16} type="cross" /></span>
                            <span title="Save" onClick={saveComment}><SVG type="tick" /></span>
                        </>
                    )
                }

                {
                    !saved && !isEditState &&
                    <span title="Edit" onClick={onEditedState}>
                        <SVG type="pencil" />
                    </span>
                }
            </h3>

            <textarea value={commentText} onChange={(e) => setCommentText(e?.target?.value)} disabled={saved || !isEditState} className={styles['comment-textbox']} name="" id=""></textarea>
        </div>
    )
}

export default AddComment