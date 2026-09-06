export type SVGType =
    | "heart"
    | "filledHeart"
    | "share"
    | "X"
    | "youtube"
    | "instagram"
    | "facebook"
    | "mail"
    | "lock"
    | "eye"
    | "eye-off"
    | "google"
    | "apple"
    | "username"
    | "chevron-down" | "chevron-up"
    | "check"
    | "error"
    | "cross"
    | "bookmark"
    | "signup"
    | "signout"
    | "book"
    | "articles"
    | "video"
    | "caseStudy"
    | "calendar"
    | "playback-button" | "playback-button-2"
    | "clock"
    | "next"
    | "thread"
    | "language"
    | "rightArrow" | "leftArrow" | "upArrowWithBorder" | "chevron-right"
    | "searchNetwork"
    | "fire"
    | "plus"
    | "minimize" | "maximize"
    | "comment"
    | "document"
    | "alert"
    | "home"
    | "user-male"
    | "sparkles"
    | "tree"
    | "course"
    | "signup-designed"
    | "mail"
    | "gallery"
    | "bulb"
    | "settings"
    | "phone"
    | "theme" | "pencil" | "tick";

export type timeZoneType = "Asia/Kolkata" | "UTC"

export type TagsType =
    | "Editor's Pick" // Editorial
    | "Featured"
    | "Trending"
    | "Most Read"
    | "Recently Added"
    | "Recommended"
    | "Staff Choice"
    | "Popular"
    | "New"
    | "Beginner"
    | "Intermediate"
    | "Advanced"
    | "Scholarly"
    | "Primary Source"
    | "Translation"
    | "Commentary"
    | "Research"
    | "Critical Edition"
    | "Verified"
    | "Classic" // Content Type
    | "Scripture"
    | "Case Study"
    | "Reference"
    | "Guide"
    | "Biography"
    | "Essential" // Importance
    | "Must Read"
    | "Foundational"
    | "Core Text"
    | "Timeless"
    | "Influential"
    | "Shruti" // Indic-specific
    | "Smriti"
    | "Itihasa"
    | "Purana"
    | "Darshana"
    | "Vedanta"
    | "Dharma"
    | "Yoga"
    | "Artha"
    | "Moksha";

export type Language = "English" | "Hindi";

export type HomeCardVariantType = "book" | "article" | "video";

export type Option = {
    label: string;
    value: string;
    svg?: SVGType
};

export type RadioGroupProps = {
    name: string;
    options: Option[];
    value: string;
    onChange: (value: string) => void;
};

export type userRole = "READER" | "AUTHOR" | "ADMIN";

export type themeType = "Default";

export type languageType = "English"

export type publishingType = "DRAFT" | "PUBLISHED" | "EDITED"

export type toolbarSVGType =
    | "undo"
    | "redo"
    | "bold"
    | "italic"
    | "underline"
    | "quote"
    | "new-line"
    | "separator"
    | "youTube-video"
    | "image"
    | "highlight"
    | "link"
    | "strikethrough"
    | "subscript"
    | "superscript"
    | "number-list" | "bullet-list";