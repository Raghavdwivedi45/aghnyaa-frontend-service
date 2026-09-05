import React from 'react';
import styles from "./InfoCard.module.scss";
import { IArticleForm1 } from '@/constants/article.interfaces';
import { formatDateTime, isDateTimeSame } from '@/utils/helperFunctions';

const InfoCard = ({ articleInfo }: { articleInfo: IArticleForm1 }) => {
    return (
        <table className={styles["article-info"]}>
            <tbody>
                <tr>
                    <th title='Category' scope="row">Category</th>
                    <td title={articleInfo?.category}>{articleInfo?.category}</td>
                </tr>
                <tr>
                    <th scope="row">Topics</th>
                    <td>
                        {
                            articleInfo?.tags?.map((tag, idx) => (tag + (idx === articleInfo?.tags?.length - 1 ? "" : ", ")))
                        }
                    </td>
                </tr>
                <tr>
                    <th scope="row">Published</th>
                    <td>{formatDateTime(articleInfo?.createdAt ?? "")}</td>
                </tr>
                {
                    !isDateTimeSame(articleInfo?.createdAt ?? "", articleInfo?.updatedAt ?? "") &&
                    <tr>
                        <th scope="row">Updated</th>
                        <td>{formatDateTime(articleInfo?.updatedAt ?? "")}</td>
                    </tr>
                }
                <tr>
                    <th scope="row">Language</th>
                    <td>{articleInfo?.language}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default InfoCard;