import { IArticleForm1, IBookmark, IComment, ILike } from '@/constants/article.interfaces';
import { fetchPOST, generatePDF } from './fetchAPIFunctions';
import { initialBookmarks } from '@/constants/article.constants';
import { URLGenerator } from './helperFunctions';

/* Client-safe article APIs: plain browser fetches with credentials, no request-time server APIs.
   Kept out of articleAPIs.ts so Client Components don't pull next/headers into the browser bundle. 
*/

const publishProxyUrl = (endpoint: string) => `/api/publish${endpoint}`;

export const createArticleDraft = async (body: IArticleForm1) => {
  const res = await fetch(publishProxyUrl('/protected/v1/articles/create-draft/'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const data: { data: IArticleForm1; errors: string[] } = await res.json();
  return { data: data?.data, errors: data?.errors || null };
};

export const updateArticleDraft = async ({
  body,
  slug,
}: {
  body: Partial<IArticleForm1>;
  slug: string;
}) => {
  const res = await fetch(publishProxyUrl(`/protected/v1/articles/create-draft/${slug}`), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const data: { data: IArticleForm1; message: string } = await res.json();
  return { data: data?.data, status: res.status, message: data?.message || '' };
};

export const likePublishedArticle = async (articleSlug: string | null) => {
  if (!articleSlug) return null;

  const data = await fetchPOST<ILike>(
    publishProxyUrl(`/protected/v1/articles/${articleSlug}/like`),
  );
  return data;
};

export const unlikePublishedArticle = async (articleSlug: string | null) => {
  if (!articleSlug) return null;

  const data = await fetchPOST<ILike>(
    publishProxyUrl(`/protected/v1/articles/${articleSlug}/like`),
    {},
    {},
    'DELETE',
  );
  return data;
};

export const bookmarkPublishedArticle = async (articleSlug: string | null) => {
  if (!articleSlug) return null;

  const result = await fetchPOST<IBookmark>(
    publishProxyUrl(`/protected/v1/articles/${articleSlug}/bookmark`),
  );
  return result;
};

export const unbookmarkPublishedArticle = async (articleSlug: string | null) => {
  if (!articleSlug) return null;

  const result = await fetchPOST<IBookmark>(
    publishProxyUrl(`/protected/v1/articles/${articleSlug}/bookmark`),
    {},
    {},
    'DELETE',
  );
  return result;
};

export const updateUserHistory = async (articleSlug: string | null) => {
  if (!articleSlug) return null;

  const { data } = await fetchPOST<IBookmark>(
    publishProxyUrl(`/protected/v1/articles/${articleSlug}/performance`),
    {},
    {},
    'PATCH',
  );
  return data ?? initialBookmarks;
};

export const generateArticlePDF = async (articleSlug: string | null) => {
  if (!articleSlug) return null;
  const message = await generatePDF(
    URLGenerator('PUBLISH', `/protected/v1/articles/${articleSlug}/pdf`),
  );
  return message;
};

export const commentArticle = async (slug: string, comment: string) => {
  if (!slug || !comment) return;
  const result = await fetchPOST<IComment>(
    publishProxyUrl(`/protected/v1/articles/${slug}/comment`),
    { comment },
  );
  return result;
};
