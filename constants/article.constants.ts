import { IArticleForm1, IBookmark, ILike, INewArticlePayload } from "./article.interfaces";
import { Option, publishingType } from "./types";

export const initialCreateNewArticle: INewArticlePayload = {
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    tags: [],
    isFeatured: false,
    category: "",
    readTime: 0
}

export const articleCategory: { key: string | number, text: string | number }[] = [
    { key: "technology", text: "technology" },
    { key: "programming", text: "programming" },
    { key: "javascript", text: "javascript" },
    { key: "typescript", text: "typescript" },
    { key: "nodejs", text: "nodejs" },
    { key: "mongodb", text: "mongodb" },
    { key: "nextjs", text: "nextjs" },
    { key: "react", text: "react" },
    { key: "career", text: "career" }
] as const;

export const articleTags: { key: string, text: string }[] = [
    { key: "jwt", text: "jwt" },
    { key: "express", text: "express" },
    { key: "mongoose", text: "mongoose" },
    { key: "docker", text: "docker" },
    { key: "git", text: "git" },
    { key: "redis", text: "redis" },
    { key: "aws", text: "aws" },
    { key: "css", text: "css" },
    { key: "html", text: "html" },
] as const;

export const publishingOptions: Option[] = [{ value: "DRAFT", label: "Draft", svg: "eye-off" }, { value: "PUBLISHED", label: "Published", svg: "eye" }]

export const initialPayload: IArticleForm1 = {
    title: "",
    slug: "",
    author: {
        _id: "",
        username: "",
        avatar: ""
    },
    likes: 0,
    bookmarks: 0,
    language: "English",
    excerpt: "",
    category: "",
    coverImage: "",
    tags: [],
    content: "",
    status: "DRAFT" as publishingType,
    isFeatured: false,
    readTime: 2,
    isLikedByUser: false,
    isBookmarkedByUser: false
}

export const initialBookmarks: IBookmark = { isBookmarkedByUser: false, bookmarks: 0 }