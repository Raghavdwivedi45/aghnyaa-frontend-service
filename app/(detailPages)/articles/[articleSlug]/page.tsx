import { IShowArticleProps } from '@/constants/interfaces';
import React from 'react';
import styles from './page.module.scss';
import RightSideCards from './_components/RightSideCards/RightSideCards';
import InfoCard from './_components/InfoCard/InfoCard';
import { fetchComments, fetchMyPublishedServer } from '@/utils/articleAPIs';
import UserStreak from './_components/UserStreak';
import HeadingList from './_components/HeadingList';
import { parse } from 'node-html-parser';
import ArticleLeftRightCombined from './_components/ArticleLeftRightCombined';
import Image from 'next/image';
import Link from 'next/link';
import { ILinkedArticlePopulated } from '@/constants/article.interfaces';

const extractHeadings = (html: string) => {
  if (!html) return [];
  const root = parse(html);
  return root.querySelectorAll('h1, h2').map((h) => h.text.trim());
};

export async function generateMetadata({ params }: IShowArticleProps) {
  const { articleSlug } = await params;
  const data = await fetchMyPublishedServer({ articleSlug, excludeContent: true });
  const article = data?.articlesWithAuthors?.[0];

  return {
    title: (article?.title ?? 'Article') + ' | Aghnyaa',
    description:
      article?.excerpt ||
      "Explore articles on India's civilizational knowledge, Indic wisdom, and living traditions.",
  };
}

const page = async ({ params }: IShowArticleProps) => {
  const { articleSlug } = await params;

  const data = await fetchMyPublishedServer({ articleSlug });
  if (!data) return <div>No article found</div>;

  const comments = await fetchComments(articleSlug);

  const articlesWithAuthors = data?.articlesWithAuthors;
  if (articlesWithAuthors?.length == 0) return <div>No article found 2</div>;

  const article = articlesWithAuthors?.[0] ?? [];

  return (
    <>
      <div className={styles['page-container']}>
        <ArticleLeftRightCombined article={article} comments={comments?.data} />

        <div className={styles['page-right']}>
          <RightSideCards heading="On This Page">
            <HeadingList headingList={extractHeadings(article?.content)} />
          </RightSideCards>

          <RightSideCards heading="Performance">
            <UserStreak />
          </RightSideCards>

          <RightSideCards heading="Article Information">
            <InfoCard articleInfo={article} />
          </RightSideCards>
        </div>
      </div>

      <div className={styles['page-container-2']}>
        <h2>Related Articles</h2>
        <div className={styles['related-card-container']}>
          {(article?.linkedArticles as unknown as ILinkedArticlePopulated[])?.map(
            (linkArticle, index) => (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                key={index}
                href={`/articles/${linkArticle?.slug}`}
              >
                <div title={linkArticle?.title} className={styles['related-card']}>
                  <div className={styles['related-card-img']}>
                    <Image
                      src={linkArticle?.coverImage}
                      fill
                      alt={linkArticle?.title || 'Related article'}
                    />
                  </div>
                  <div className={styles['related-card-title']}>{linkArticle?.title}</div>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default page;
