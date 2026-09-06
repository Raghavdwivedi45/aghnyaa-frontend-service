import { languageArray, themeArray } from "@/constants/constants";
import { timeZoneType } from "@/constants/types";

export function formatDateTime(date: string | Date, timeZone?: timeZoneType | null, noTime: boolean = false) {
    const payload: Intl.DateTimeFormatOptions = {
        dateStyle: "medium",
        // Automatically converted to the visitor's timezone.
    }
    if (!noTime) {
        payload.timeStyle = "short"
    }
    // If you want a specific timezone

    payload.timeZone = timeZone || "Asia/Kolkata"
    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
        return "";
    }
    return new Intl.DateTimeFormat(undefined, payload).format(parsedDate);
}

export const isDateTimeSame = (dateA: Date | string, dateB: Date | string): boolean => {
    const timeA = new Date(dateA).getTime();
    const timeB = new Date(dateB).getTime();
    return !Number.isNaN(timeA) && !Number.isNaN(timeB) && timeA === timeB;
};

export function zeroPrefixedCount(count: number) {
    return count < 10 ? `0${count}` : count;
    // for numbers < 10, returns the number with prefix "0"
}

export const chapterIterator = (chapterNumbers: number) => {
    let arr = [];
    for (let i = 1; i <= chapterNumbers; i++) {
        arr.push(i);
    }
    return arr;
    // if you give it 5, it returns you [1, 2, 3, 4, 5]
}

/* Keeps only the fields that actually changed -> a PATCH then sends just those. Arrays are compared item by item. */
export const getChangedFields = <T extends object>(current: T, original: T) => {
    const changed: Partial<T> = {};

    for (const key in current) {
        const now = current[key];
        const before = original[key];

        const isSame = Array.isArray(now) && Array.isArray(before)
            ? now.join(",") === before.join(",")
            : now === before;

        if (!isSame) changed[key] = now;
    }

    return changed;
}

export const URLGenerator: ((domain: "USER" | "PUBLISH", endpoint: string, queryParams?: string) => string) = (domain = "USER", endpoint, queryParams = "") => {
    // endpoint should start with "/"
    const onServer = typeof window === "undefined";
    let prefix = "";
    switch (domain) {
        case "PUBLISH":
            prefix = (onServer ? process.env.AGHNYAA_PUBLISH_SERVICE_INTERNAL : "") || process.env.NEXT_PUBLIC_AGHNYAA_PUBLISH_SERVICE || "";
            break;
        case "USER":
        default:
            prefix = (onServer ? process.env.AGHNYAA_USER_SERVICE_INTERNAL : "") || process.env.NEXT_PUBLIC_AGHNYAA_USER_SERVICE || "";
            break;
    }
    return prefix + endpoint + `${queryParams ? "?" : ""}${queryParams}`;
}

export const fileSizeToMB = (sizeInBytes: number) => {
    return (sizeInBytes / (1024 * 1024)).toFixed(2); // Convert bytes to MB and round to 2 decimal places
}

export const isThemeType = (theme: string | number) => {
    const themeName = theme?.toString();
    return themeArray.some(theme => theme.key === themeName);
}

export const isLanguageType = (lang: string | number) => {
    const language = lang?.toString();
    return languageArray.some(lang => lang.key === language);
}

export const buildQueryParams = (filters: object) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            params.set(key, String(value));
        }
    });

    return params.toString();
};