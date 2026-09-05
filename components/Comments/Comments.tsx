import React from 'react';
import styles from "./Comments.module.scss";
import { formatDateTime } from '@/utils/helperFunctions';
;   

const Comments = ({username, createdAt, commentContent} : { username: string; createdAt: string | Date; commentContent: string }) => {
  return (
    <div className={styles['comment-container']}>
        <div className={styles['comment-user-info']}>
            <span><b>{username}</b></span>
            <span  className={styles['comment-date']}>{formatDateTime(createdAt)}</span>
        </div>
        <p>{commentContent}</p>
    </div>
  )
}

export default Comments;