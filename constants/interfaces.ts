import { HomeCardVariantType, languageType, SVGType, TagsType, themeType, userRole } from "./types";
import { tagColors } from "./constants";

export type TagBackgroundColor = (typeof tagColors)[number]["background"];
export type TagTextColor = (typeof tagColors)[number]["color"];

export interface IButtonSet {
    primaryText?: string;
    primaryDisabledText?: string;
    secondaryText?: string;
    onPrimaryClick?: () => void;
    onSecondaryClick?: () => void;
    showPrimary?: boolean;
    showSecondary?: boolean;
    disablePrimary?: boolean;
    disableSecondary?: boolean;
    primarySVG?: SVGType | "";
    secondarySVG?: SVGType | "";
    SVGPosition?: "left" | "right"
}

export interface ISVGWithText {
    type?: SVGType;
    src?: string;
    value: string | number;
    height?: number;
    width?: number;
    color?: string
    withDesign?: boolean;
    index?: number;
    direction?: "left" | "right"
}

export interface IBook {
    id: number;
    tag: TagsType;
    title: string;
    author: string;
    description: string;
    createdAt: string;
    slug: string;
    views?: number;
    likes?: number;
}

export interface IThumbnail {
    url: string;
    width: number;
    height: number;
}

export interface IVideo {
    id: number;
    tag: TagsType;
    title: string;
    creator: string;
    createdAt: string;
    thumbnail: IThumbnail;
    duration: string;
    embedUrl: string; // for links from different platforms
    videoURL: string; // only for uploads on our platform
    source: "youtube" | "upload"; // "instagram" | "facebook" in 2nd phase
    height: number;
    width: number;
    views?: number;
    likes?: number;
}

export interface IBookInfo {
    currentBooks: IBook[];
}

export interface IVideoInfo {
    currentVideos: IVideo[];
}

export interface IHomeCardVariant {
    direction?: "row" | "row-reverse";
    variant?: HomeCardVariantType;
}

export interface ISVGTagsStyle {
    backgroundColor: TagBackgroundColor;
    color: TagTextColor;
    borderRadius: "8px" | "16px";
    padding: "4px" | "4px 8px";
}

export interface IVideoCardProps {
    videoID: string;
    onThumbnailClick?: (videoId: string) => void;
    isPlaying: boolean;
}

export interface IVideoMetaDataProps {
    type: SVGType,
    value: string | number,
    height?: number,
    width?: number
}

export interface IShowArticleProps {
    params: Promise<{
        articleSlug: string;
    }>;
}

export interface ICreateArticleProps {
    /* Optional catch all route -> the segment is absent on create and a one item array on edit. */
    params: Promise<{
        articleId?: string[];
    }>;
}

export interface IShowBooksProps {
    params: Promise<{
        bookSlug: string;
    }>;
}

export interface IProgressRingProps {
    progress: number;
    total?: number;
    size?: number;
    strokeWidth?: number;
    color?: string;
    trackColor?: string;
}

export interface IDetailedArticlePageSidebarProps { type: SVGType; value: string, activeType?: SVGType }

export interface IBookIndexChapters {
    id: string;
    title: string;
    verseCount: number;
    slug: string;
}

export interface IBreadCrumb { route: string; text: string };

export interface IChapterSidebarDetails {
    chapterNumber: number;
    title: string;
    slug: string;
    totalVerses: number
}

export interface ISignupPayload {
    username: string;
    email: string;
    password: string;
    role: userRole;
    contact: {
        countryCode: string;
        phone: string;
    }
}

export interface ILoginPayload {
    username: string;
    email: string;
    password: string;
}
export interface IUserInfo {
    _id: string;
    role: userRole;
    preferences: {
        theme: themeType,
        language: languageType
    };
    isBlocked: boolean;
    avatar: string;
    emailVerified: boolean;
    contactVerified: false;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUserContact {
    countryCode: string;
    phone: string;
}

export interface IUserSettingsInfo extends IUserInfo {
    _id: string;
    username: string;
    email: string;
    contact: IUserContact;
    __v: number;
}

export interface IUserStreak {
    user: {
        username: string;
    };
    streak: {
        currentStreak: number;
        longestStreak: number;
    }
}


export interface IUserInfoResponse extends IUserInfo {
    otp: any
    password: any
}

export interface IUploadImageResponse {
    url: string,
    fields: Record<string, string>,
    key: string
}