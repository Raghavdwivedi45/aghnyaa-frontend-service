import { IAllArticleFilters, IAllAuthors, IArticleForm1, IComment, ITopPerformers } from "@/constants/article.interfaces";
import { fetchGET } from "./fetchAPIFunctions";
import { buildQueryParams, URLGenerator } from "./helperFunctions";
import { cookies } from "next/headers";
import { initialPayload } from "@/constants/article.constants";

export const fetchArticleInfo = async (articleSlug: string | null) => {
    // used when rendering any type(draft/published) article for editing (login required)
    if (!articleSlug) return initialPayload;

    /* cookies() is a request-time API -> it has to be read per request, never cached in module scope. */
    const cookieStore = await cookies();
    const { data } = await fetchGET<IArticleForm1>(URLGenerator("PUBLISH", `/protected/v1/articles/${articleSlug}`), { Cookie: cookieStore.toString() });
    return data ?? initialPayload;
}

export const fetchMyDrafts = async () => {
    // used on settings page
    const cookieStore = await cookies();
    const { data } = await fetchGET<IArticleForm1[]>(URLGenerator("PUBLISH", `/protected/v1/articles/all-my-drafts`), { Cookie: cookieStore.toString() });
    return data;
}

export const fetchMyPublished = async (filters: IAllArticleFilters = {}) => {
    const cookieStore = await cookies();
    const queryParams = buildQueryParams(filters);
    const d = await fetchGET<{ articlesWithAuthors: IArticleForm1[]; totalPages: number }>(URLGenerator("PUBLISH", "/v1/articles", queryParams.toString()), { Cookie: cookieStore.toString() })
    console.log(d)
    const { data } = await fetchGET<{ articlesWithAuthors: IArticleForm1[]; totalPages: number }>(URLGenerator("PUBLISH", "/v1/articles", queryParams.toString()), { Cookie: cookieStore.toString() });
    return data;
}

export const fetchAllPublishedAuthors = async () => {
    const { data } = await fetchGET<IAllAuthors[]>(URLGenerator("PUBLISH", "/v1/articles/user-list"));
    return data;
}

export const fetchTopPerformers = async () => {
    const { data } = await fetchGET<ITopPerformers>(URLGenerator("PUBLISH", "/v1/articles/top-performers"));
    return data;
}

export const fetchComments = async (slug: string) => {
    const cookieStore = await cookies();
    const data = await fetchGET<IComment[]>(URLGenerator("PUBLISH", `/protected/v1/articles/${slug}/comment`), { Cookie: cookieStore.toString() });
    return data;
}