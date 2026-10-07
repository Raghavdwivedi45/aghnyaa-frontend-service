import React from 'react';
import styles from './allArticles.module.scss';
import ArticleCard from '../_components/ArticleCard/ArticleCard';
import ArticlePageExtras from '../_components/ArticlePageExtras/ArticlePageExtras';
import { fetchMyPublished } from '@/utils/articleAPIs';
import Pagination from '@/components/Pagination/Pagination';
interface ArticlesPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    tags?: string;
    authors?: string;
    createdAfter?: string;
    createdBefore?: string;
  }>;
}

const page = async ({ searchParams }: ArticlesPageProps) => {
  const params = await searchParams;

  const filters: Record<string, string | number> = {};
  filters.page = params?.page || 1;
  filters.category = params?.category || '';
  filters.tags = params?.tags || '';
  filters.authors = params?.authors || '';
  filters.createdAfter = params?.createdAfter || '';
  filters.createdBefore = params?.createdBefore || '';

  const data = await fetchMyPublished(filters);

  const articles = data?.articlesWithAuthors;

  const totalPages = data?.totalPages;
  const pageNumber = Number(filters.page);
  const currentPage = Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;

  return (
    <div>
      <div className={styles['articles-container']}>
        <div className={styles['articles-content']}>
          <h2>
            All Articles{' '}
            <span className={styles['articles-count']}>
              &nbsp;&nbsp;(Showing {articles?.length ?? 0} articles)
            </span>
          </h2>
          {articles &&
            articles.map((el, idx) => <ArticleCard article={el} index={idx} key={idx} />)}
        </div>
        <div className={styles['articles-notifications']}>
          <ArticlePageExtras />
        </div>
      </div>
      <div className="pagination-bar">
        <Pagination currentPage={currentPage} totalPages={totalPages ?? 0} />
      </div>
    </div>
  );
};

export default page;
