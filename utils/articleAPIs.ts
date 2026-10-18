import {
  IAllArticleFilters,
  IAllAuthors,
  IArticleForm1,
  IComment,
  ITopPerformers,
} from '@/constants/article.interfaces';
import { fetchGET } from './fetchAPIFunctions';
import { buildQueryParams, URLGenerator } from './helperFunctions';
import { getPublishAuthorizationHeaders } from './publishAuthorization.server';
import { initialPayload } from '@/constants/article.constants';

export const fetchArticleInfo = async (articleSlug: string | null) => {
  // used when rendering any type(draft/published) article for editing (login required)
  if (!articleSlug) return initialPayload;

  const { data } = await fetchGET<IArticleForm1>(
    URLGenerator('PUBLISH', `/protected/v1/articles/${articleSlug}`),
    await getPublishAuthorizationHeaders(),
  );
  return data ?? initialPayload;
};

export const fetchMyDrafts = async () => {
  // used on settings page
  const { data } = await fetchGET<IArticleForm1[]>(
    URLGenerator('PUBLISH', `/protected/v1/articles/all-my-drafts`),
    await getPublishAuthorizationHeaders(),
  );
  return data;
};

export const fetchMyPublished = async (filters: IAllArticleFilters = {}) => {
  try {
    const queryParams = buildQueryParams(filters);
    const res = await fetch(URLGenerator('PUBLISH', '/v1/articles', queryParams.toString()));

    if (!res.ok) {
      console.log(res?.statusText);
    }

    const data: { data: { articlesWithAuthors: IArticleForm1[]; totalPages: number } } =
      await res.json();
    return data?.data;
  } catch (e) {
    console.error('Error fetching my published articles:', e);
  }
};

export const fetchAllPublishedAuthors = async () => {
  const { data } = await fetchGET<IAllAuthors[]>(URLGenerator('PUBLISH', '/v1/articles/user-list'));
  return data;
};

export const fetchTopPerformers = async () => {
  const { data } = await fetchGET<ITopPerformers>(
    URLGenerator('PUBLISH', '/v1/articles/top-performers'),
  );
  return data;
};

export const fetchComments = async (slug: string) => {
  const data = await fetchGET<IComment[]>(
    URLGenerator('PUBLISH', `/protected/v1/articles/${slug}/comment`),
    await getPublishAuthorizationHeaders(),
  );
  return data;
};
