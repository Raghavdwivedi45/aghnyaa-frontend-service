import { IBreadCrumb, IDetailedArticlePageSidebarProps, ILoginPayload, ISignupPayload, IVideoMetaDataProps } from "./interfaces";
import { HomeCardVariantType, languageType, SVGType, themeType, userRole } from "./types";

export const BRAND_NAME = "Aghnyaa";

export const headerNavLinks = [
    { text: "Books", endpoint: "/books" },
    { text: "Articles", endpoint: "/articles" },
    { text: "Videos", endpoint: "/videos" },
    { text: "Cases", endpoint: "/cases" },
    { text: "Contact Us", endpoint: "/contact" }
]

export const heroStats: { icon: SVGType, count: string | number, label: string }[] = [
    {
        icon: "book",
        count: "250",
        label: "Books",
    },
    {
        icon: "articles",
        count: "500",
        label: "Articles",
    },
    {
        icon: "video",
        count: "100",
        label: "Videos",
    },
    {
        icon: "caseStudy",
        count: "50",
        label: "Case Studies",
    },
];


export const heroTagLines: string[] = ["यतो धर्मस्ततो जयः", "धर्मो रक्षति रक्षितः", "रामो विग्रहवान् धर्मः", "परोपकाराय पुण्याय", "धर्मेण हीनाः पशुभिः समानाः"];

export const footerTagLine = "Preserving and sharing the timeless wisdom of the Indic knowledge tradition.";

export const footerLinkColumns: { heading: string; links: { text: string; endpoint: string }[] }[] = [
    {
        heading: "Explore",
        links: [
            { text: "Books", endpoint: "/books" },
            { text: "Articles", endpoint: "/articles" },
            { text: "Videos", endpoint: "/videos" },
            { text: "Case Studies", endpoint: "/cases" },
        ],
    },
    {
        heading: "Company",
        links: [
            { text: "About Us", endpoint: "/about" },
            { text: "Contact Us", endpoint: "/contact" },
            { text: "Careers", endpoint: "/careers" },
            { text: "Blog", endpoint: "/blog" },
        ],
    },
    {
        heading: "Legal",
        links: [
            { text: "Privacy Policy", endpoint: "/privacy" },
            { text: "Terms of Service", endpoint: "/terms" },
            { text: "Cookie Policy", endpoint: "/cookies" },
        ],
    },
];

export const footerSocialLinks: { icon: SVGType; label: string; href: string }[] = [
    { icon: "X", label: "X", href: "https://x.com" },
    { icon: "instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "youtube", label: "YouTube", href: "https://youtube.com" },
    { icon: "mail", label: "Email", href: "mailto:hello@aghnyaa.com" },
];

export const homeCardInformation: Record<HomeCardVariantType, { header: string; text: string; }> = {
    book: {
        header: "Featured Collections",
        text: "Immerse yourself into our handpicked selections and begin your journey."
    },

    article: {
        header: "Latest Articles",
        text: "Explore thoughtful essays, research and timeless insights from the Indic knowledge tradition."
    },

    video: {
        header: "Latest Videos",
        text: "Watch illuminating talks, lectures and visual journeys that bring ancient wisdom to life."
    }
};

export const tagColors = [
    {
        background: "#D57A6E50",
        color: "#b83928ff",
    },
    {
        background: "#CFAE6350",
        color: "#917128ff",
    },
    {
        background: "#6EA48E50",
        color: "#3c7960ff",
    },
    {
        background: "#7DA8B850",
        color: "#417385ff",
    },
    {
        background: "#A487D350",
        color: "#694f94ff",
    },
    {
        background: "#D18AA750",
        color: "#9e5473ff",
    },
    {
        background: "#9B7A5E50",
        color: "#976940ff",
    },
    {
        background: "#C77C4A50",
        color: "#a76337ff",
    },
    {
        background: "#7F9A5F50",
        color: "#44641eff",
    },
    {
        background: "#7D6DB550",
        color: "#503f8dff",
    },
    {
        background: "#C18C5D50",
        color: "#915b2bff",
    },
    {
        background: "#A96B5850",
        color: "#814331ff",
    },
    {
        background: "#89A6C750",
        color: "#5e84b1ff",
    },
    {
        background: "#B48B9F50",
        color: "#792d52ff",
    },
    {
        background: "#C0A16B50",
        color: "#92733cff",
    },
    {
        background: "#8FAE8650",
        color: "#4c853dff",
    },
] as const;

export const videoCardBottomRightIcons: SVGType[] = ["bookmark", "heart", "share"];

export const videoCardMetaData: IVideoMetaDataProps[] = [
    {
        type: "heart",
        value: "5266",
    },
    {
        type: "comment",
        value: 314,
        height: 24,
        width: 24
    },
    {
        type: "calendar",
        value: "July 10, 2048",
    }
];

export const DetailedBookPageActions: IDetailedArticlePageSidebarProps[] = [
    { type: "bookmark", value: "Bookmark" },
    { type: "share", value: "Share" },
    { type: "heart", value: "Love" },
    // { type: "alert", value: "Report" }, -> will implement in future
]

export const signupCards: IDetailedArticlePageSidebarProps[] = [
    { type: "book", value: "Access Sacred Books" },
    { type: "course", value: "Personalized Reading" },
    { type: "tree", value: "Daily Reflections" },
    { type: "sparkles", value: "Save Your Progress" }
]

export const bookStats: { type: SVGType, value: string, label: string }[] = [
    { type: "language", value: "Sanskrit", label: "Language" },
    { type: "fire", value: "Intermediate", label: "Difficulty" },
    { type: "book", value: "96 Pages", label: "Length" },
    { type: "clock", value: "2h 15m", label: "Reading Time" },
];


export const chapterSidebarOptions: { type: SVGType, value: string }[] = [
    { type: "book", value: "Book Information" },
    { type: "bookmark", value: "Your Bookmarks" },
    { type: "user-male", value: "Author Information" }
]

export const avatarGroup = [
    "/background.png",
    "/background.png",
    "/background.png",
    "/background.png",
    "/background.png",
];

export const initialSignupPayload: ISignupPayload = {
    username: "",
    email: "",
    password: "",
    role: "READER",
    contact: {
        countryCode: "+91",
        phone: ""
    }
}

export const initialLoginPayload: ILoginPayload = {
    username: "",
    email: "",
    password: "",
}

export const userRadioOptions: { label: userRole, value: string }[] = [
    { label: "READER", value: "READER" },
    { label: "AUTHOR", value: "AUTHOR" }
]

export const countryCodes: { key: string; text: string }[] = [
    { key: "+91", text: "🇮🇳 +91" },
    { key: "+1", text: "🇺🇸 +1" },
    { key: "+44", text: "🇬🇧 +44" },
    { key: "+61", text: "🇦🇺 +61" },
    { key: "+971", text: "🇦🇪 +971" },
    { key: "+65", text: "🇸🇬 +65" },
    { key: "+81", text: "🇯🇵 +81" },
]

export const headingList = [
    { key: 1, text: 1 },
    { key: 2, text: 2 },
    { key: 3, text: 3 },
    { key: 4, text: 4 },
    { key: 5, text: 5 },
    { key: 6, text: 6 },
]

// `key` is passed straight to setFontFamily(), so it must be a valid CSS
// font-family value. Quoted names stay quoted for families with spaces.
export const fontFamilyList = [
    { key: "Inter", text: "Inter" },
    { key: "Arial, Helvetica, sans-serif", text: "Arial" },
    { key: '"Times New Roman", Times, serif', text: "Times New Roman" },
    { key: "Georgia, serif", text: "Georgia" },
    { key: '"Courier New", Courier, monospace', text: "Courier New" },
    { key: '"Comic Sans MS", "Comic Sans"', text: "Comic Sans" },
    { key: "Verdana, Geneva, sans-serif", text: "Verdana" },
    { key: '"Trebuchet MS", sans-serif', text: "Trebuchet MS" },
    { key: "serif", text: "Serif" },
    { key: "sans-serif", text: "Sans Serif" },
    { key: "monospace", text: "Monospace" },
    { key: "cursive", text: "Cursive" },
]

// `key` is passed straight to setFontSize(), so it must be a valid CSS
// font-size value (px). `text` is the label shown in the dropdown.
export const fontSizeList = [
    { key: "12px", text: "12" },
    { key: "14px", text: "14" },
    { key: "16px", text: "16" },
    { key: "18px", text: "18" },
    { key: "20px", text: "20" },
    { key: "24px", text: "24" },
    { key: "28px", text: "28" },
    { key: "32px", text: "32" },
    { key: "36px", text: "36" },
    { key: "48px", text: "48" },
]

// `key` is passed straight to toggleTextAlign(), so it must be one of the
// configured alignments on the TextAlign extension.
export const textAlignList = [
    { key: "left", text: "Left" },
    { key: "center", text: "Center" },
    { key: "right", text: "Right" },
    { key: "justify", text: "Justify" },
]

export const newArticleBreadcrumbs: IBreadCrumb[] = [
    { route: "/articles", text: "Articles" },
    { route: "/articles/new", text: "New Article" }
]

export const themeArray: { key: themeType, text: themeType }[] = [
    { key: "Default", text: "Default" }
]

export const languageArray: { key: languageType, text: languageType }[] = [
    { key: "English", text: "English" }
]