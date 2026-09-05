import { IShowArticleProps } from '@/constants/interfaces';
import React from 'react';
import styles from "./page.module.scss";
import RightSideCards from './_components/RightSideCards/RightSideCards';
import InfoCard from './_components/InfoCard/InfoCard';
import { fetchComments, fetchMyPublished } from '@/utils/articleAPIs';
import UserStreak from "./_components/UserStreak";
import HeadingList from './_components/HeadingList';
import { parse } from "node-html-parser";
import ArticleLeftRightCombined from './_components/ArticleLeftRightCombined';

const extractHeadings = (html: string) => {
    const root = parse(html);
    return root.querySelectorAll("h1, h2").map(h => h.text.trim());
};

const page = async ({ params }: IShowArticleProps) => {
    const { articleSlug } = await params;
    const data = await fetchMyPublished({ articleSlug });
    if (!data) return <div>No article found</div>;

    const comments = await fetchComments(articleSlug);

    const { articlesWithAuthors } = data;
    const article = articlesWithAuthors?.[0] ?? [];

    if (articlesWithAuthors.length==0) return <div>No article found 2</div>;

    return (
        <div className={styles["page-container"]}>

            <ArticleLeftRightCombined article={article} comments={comments?.data} />

            <div className={styles["page-right"]}>
                <RightSideCards heading='On This Page'>
                    <HeadingList headingList={extractHeadings(article?.content)} />
                </RightSideCards>

                <RightSideCards heading='Performance'>
                    <UserStreak />
                </RightSideCards>

                <RightSideCards heading='Article Information'>
                    <InfoCard articleInfo={article} />
                </RightSideCards>
            </div>
        </div>
    )
}

export default page