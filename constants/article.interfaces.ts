import { languageType, publishingType } from "./types";

export interface INewArticlePayload {
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    tags: string[];
    isFeatured: boolean;
    category: string;
    readTime: number;

}

export interface IArticleForm1 {
    _id?: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string;
    author: {
        _id: string;
        username: string;
        avatar?: string;
    };
    category: string;
    tags: string[];
    content: string;
    status: publishingType;
    isFeatured: boolean;
    readTime: number;
    createdAt?: Date
    updatedAt?: Date;
    likes: number;
    bookmarks: number;
    language: languageType;
    isBookmarkedByUser: boolean
    isLikedByUser: boolean
}

export interface IArticleAuthorInfo {
    username: string;
    avatar: string
    _id: string
}

export interface ILike { isLikedByUser: boolean, likes: number }
export interface IBookmark { isBookmarkedByUser: boolean, bookmarks: number }

export interface IDetailedSidebar {
    progress: number,
    articleSlug: string,
    isLiked: boolean,
    isBookmarked: boolean,
    likeOrBookmarkArticle: (key: "likes" | "bookmarks", count: number, state: boolean) => void
}

export interface ITopPerformers {
    top3Categories: {
        category: string;
        count: number
    }[];
    top3LikedArticles: {
        title: string;
        slug: string;
        coverImage: string
    }[]
}

export interface IAllArticleFilters {
    page?: number;
    limit?: number;
    authorId?: string;
    createdAfter?: Date;
    createdBefore?: Date;
    articleSlug?: string;
}

export interface IAllAuthors {
    _id: string;
    username: string
}

export interface IComment {
    commentBy: {
        _id: string;
        username: string
    };
    articleId: string;
    comment: string;
    createdAt: string
}