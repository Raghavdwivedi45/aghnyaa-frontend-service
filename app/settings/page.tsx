import React from 'react'
import styles from "./page.module.scss";
import Image from 'next/image';
import UserSettingInputs from './_components/UserSettingInputs';
import { fetchUserInfo } from '@/utils/userAPIs';
import { fetchMyDrafts, fetchMyPublished } from '@/utils/articleAPIs';
import Link from 'next/link';
import { formatDateTime } from '@/utils/helperFunctions';

const page = async () => {
    const userInfo = await fetchUserInfo();
    const myDrafts = await fetchMyDrafts();
    const published = await fetchMyPublished();

    if (!userInfo) return null;

    return (
        <div className={styles["settings-input-container"]}>

            <div className={styles["user-avatar"]}>
                {userInfo?.avatar && <Image src={userInfo?.avatar} alt="User Avatar" fill />}
            </div>

            <UserSettingInputs userInfo={userInfo} />

            <h2 className={styles["settings-heading"]}>Drafts Articles</h2>

            <div className={styles["user-drafts"]}>
                {
                    myDrafts?.map((article, idx) => (
                        <Link key={idx} href={`/articles/${article?.slug}`}>
                            <div className={styles["draft-box"]}>
                                <h4 title={article?.title} className={styles["draft-heading"]}>{article?.title}</h4>
                                {article?.createdAt && (<p className={styles["draft-creation"]}>{formatDateTime(article?.createdAt)}</p>)}
                            </div>
                        </Link>
                    ))
                }
            </div>

            <h2 className={styles["settings-heading"]}>Published Articles</h2>

            <div className={styles["user-drafts"]}>
                {
                    published?.articlesWithAuthors?.map((article, idx) => (
                        <Link key={idx} href={`/articles/${article?.slug}`}>
                            <div className={styles["draft-box"]}>
                                <h4 title={article?.title} className={styles["draft-heading"]}>{article?.title}</h4>
                                {article?.createdAt && (<p className={styles["draft-creation"]}>{formatDateTime(article?.createdAt)}</p>)}
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default page