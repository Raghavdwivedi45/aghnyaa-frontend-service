import { IBookmark, IComment, ILike } from "@/constants/article.interfaces";
import { fetchPOST, generatePDF } from "./fetchAPIFunctions";
import { URLGenerator } from "./helperFunctions";
import { initialBookmarks } from "@/constants/article.constants";

/* Client-safe article APIs: plain browser fetches with credentials, no request-time server APIs.
   Kept out of articleAPIs.ts so Client Components don't pull next/headers into the browser bundle. */

export const likePublishedArticle = async (articleSlug: string | null) => {
    if (!articleSlug) return null;

    const data = await fetchPOST<ILike>(URLGenerator("PUBLISH", `/protected/v1/articles/${articleSlug}/like`));
    return data;
}

export const unlikePublishedArticle = async (articleSlug: string | null) => {
    if (!articleSlug) return null;

    const data = await fetchPOST<ILike>(URLGenerator("PUBLISH", `/protected/v1/articles/${articleSlug}/like`), {}, {}, "DELETE");
    return data;
}

export const bookmarkPublishedArticle = async (articleSlug: string | null) => {
    if (!articleSlug) return null;

    const result = await fetchPOST<IBookmark>(URLGenerator("PUBLISH", `/protected/v1/articles/${articleSlug}/bookmark`));
    return result;
}

export const unbookmarkPublishedArticle = async (articleSlug: string | null) => {
    if (!articleSlug) return null;

    const result = await fetchPOST<IBookmark>(URLGenerator("PUBLISH", `/protected/v1/articles/${articleSlug}/bookmark`), {}, {}, "DELETE");
    return result;
}

export const updateUserHistory = async (articleSlug: string | null) => {
    if (!articleSlug) return null;

    const { data } = await fetchPOST<IBookmark>(URLGenerator("PUBLISH", `/protected/v1/articles/${articleSlug}/performance`), {}, {}, "PATCH");
    return data ?? initialBookmarks;
}

export const generateArticlePDF = async (articleSlug: string | null) => {
    if (!articleSlug) return null;
    const message = await generatePDF(URLGenerator("PUBLISH", `/protected/v1/articles/${articleSlug}/pdf`))
    return message;
}

export const commentArticle = async (slug: string, comment: string) => {
    if (!slug || !comment) return;
    const result = await fetchPOST<IComment>(URLGenerator("PUBLISH", `/protected/v1/articles/${slug}/comment`), { comment });
    return result;
}