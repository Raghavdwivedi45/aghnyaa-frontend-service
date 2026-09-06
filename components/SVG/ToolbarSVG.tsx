import { toolbarSVGType } from "@/constants/types";

interface ToolbarSVGProps {
    type: toolbarSVGType;
    color?: string;
    size?: number | string;
    fillColor?: string;
}

const ToolbarSVG = ({
    type,
    color = 'currentColor',
    size = 20,
    fillColor = 'none',
}: ToolbarSVGProps) => {
    switch (type) {

        case "bold":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 7V11H13C14.1046 11 15 10.1046 15 9C15 7.89543 14.1046 7 13 7H9ZM15.9365 11.7161C16.5966 11.0028 17 10.0485 17 9C17 6.79086 15.2091 5 13 5H8.5C7.67157 5 7 5.67157 7 6.5V12V18.5C7 19.3284 7.67157 20 8.5 20H13.5C15.9853 20 18 17.9853 18 15.5C18 13.9126 17.178 12.5171 15.9365 11.7161ZM13 13H9V18H13.5C14.8807 18 16 16.8807 16 15.5C16 14.1193 14.8807 13 13.5 13H13Z"
                        fill={color}
                    />
                </svg>
            );

        case "italic":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8 6C8 5.44772 8.44772 5 9 5H12H15C15.5523 5 16 5.44772 16 6C16 6.55228 15.5523 7 15 7H12.8579L11.1656 18H13C13.5523 18 14 18.4477 14 19C14 19.5523 13.5523 20 13 20H10H7C6.44772 20 6 19.5523 6 19C6 18.4477 6.44772 18 7 18H9.14208L10.8344 7H9C8.44772 7 8 6.55228 8 6Z"
                        fill={color}
                    />
                </svg>
            );

        case "underline":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M8 4V10C8 12.2091 9.79086 14 12 14C14.2091 14 16 12.2091 16 10V4"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M6 20H18"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "quote":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9.62231 6.78278C10.0546 6.43909 10.1265 5.81001 9.78277 5.3777C9.43908 4.94539 8.81001 4.87354 8.37769 5.21724C4.73471 8.11342 4 11.8784 4 16C4 17.6569 5.34315 19 7 19C8.65685 19 10 17.6569 10 16C10 14.3432 8.65685 13 7 13C6.71233 13 6.43412 13.0405 6.17076 13.1161C6.5162 10.5872 7.45738 8.50391 9.62231 6.78278ZM20 16C20 17.6569 18.6569 19 17 19C15.3431 19 14 17.6569 14 16C14 11.8784 14.7347 8.11342 18.3777 5.21724C18.81 4.87354 19.4391 4.94539 19.7828 5.3777C20.1265 5.81001 20.0546 6.43909 19.6223 6.78278C17.4574 8.50391 16.5162 10.5872 16.1708 13.1161C16.4341 13.0405 16.7123 13 17 13C18.6569 13 20 14.3432 20 16Z"
                        fill={color}
                    />
                </svg>
            );

        case "new-line":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.5859 14.4141L24.1719 18H6V8H4V18C4 19.1046 4.89543 20 6 20H24.1719L20.586 23.5859L22 25L28 19L22 13L20.5859 14.4141Z"
                        fill={color}
                    />
                </svg>
            );

        case "separator":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <line
                        x1="3"
                        y1="12"
                        x2="21"
                        y2="12"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <polyline
                        points="8 8 12 4 16 8"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <polyline
                        points="16 16 12 20 8 16"
                        fill="none"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        case "youTube-video":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <rect
                        x="3"
                        y="6"
                        width="18"
                        height="12"
                        rx="3"
                        stroke={color}
                        strokeWidth="2"
                    />
                    <path
                        d="M10 9L15 12L10 15V9Z"
                        fill={color}
                    />
                </svg>
            );

        case "image":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <rect
                        x="3"
                        y="4"
                        width="18"
                        height="16"
                        rx="2"
                        stroke={color}
                        strokeWidth="2"
                    />
                    <circle cx="16" cy="9" r="2" stroke={color} strokeWidth="2" />
                    <path
                        d="M4 17L9 12L13 16L16 13L20 17"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        case "highlight":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M20.2586 2.00438C20.6383 2.00473 20.9518 2.28716 21.0011 2.65328L21.0079 2.75506L21.0038 7.25277C21.0009 8.40909 20.1271 9.36073 19.0029 9.48672V11.7465C19.0029 12.9373 18.0773 13.9121 16.9065 13.9913L16.7525 13.9965H16.5018V16.7881C16.5018 17.6031 16.0617 18.3493 15.3601 18.7462L15.2058 18.8258L8.57108 21.9321C8.10485 22.1504 7.57412 21.8451 7.5096 21.3536L7.50307 21.2529V13.9965H7.25C6.05914 13.9965 5.08436 13.0713 5.00519 11.9005L5 11.7465V9.48719C3.92882 9.36894 3.08392 8.49812 3.00589 7.41488L3 7.25087V2.75439C3 2.34017 3.33579 2.00438 3.75 2.00438C4.1297 2.00438 4.44349 2.28654 4.49315 2.65261L4.5 2.75439V7.25087C4.5 7.63057 4.78215 7.94436 5.14823 7.99402L5.25 8.00087H18.7513C19.1316 8.00025 19.4461 7.7176 19.4967 7.35185L19.5038 7.2502L19.5079 2.75371C19.5083 2.3395 19.8444 2.00401 20.2586 2.00438ZM15.0018 13.9965H9.00307V20.0736L14.5698 17.4674C14.8004 17.3594 14.9582 17.1432 14.994 16.8958L15.0018 16.7881V13.9965ZM17.5025 9.50038H6.5V11.7465C6.5 12.1262 6.78215 12.44 7.14823 12.4896L7.25 12.4965H16.7525C17.1322 12.4965 17.446 12.2143 17.4956 11.8483L17.5025 11.7465V9.50038Z"
                        fill={color}
                    />
                </svg>
            );

        case "link":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M10 14L14 10"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M8 16L6.5 17.5C5.11929 18.8807 2.88071 18.8807 1.5 17.5C0.119288 16.1193 0.119288 13.8807 1.5 12.5L5 9"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M16 8L17.5 6.5C18.8807 5.11929 21.1193 5.11929 22.5 6.5C23.8807 7.88071 23.8807 10.1193 22.5 11.5L19 15"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "strikethrough":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M5 12H19"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M16 6C15 5 13.7 4.5 12 4.5C9.5 4.5 8 5.8 8 7.5C8 11 16 10 16 14.5C16 16.5 14.2 18 11.5 18C9.8 18 8.2 17.4 7 16"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        case "subscript":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M5 6L11 16M11 6L5 16"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M16 15C17.5 15 19 16 19 17.5C19 19 17.5 20 16 20H19"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "superscript":
            return (
                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                    <path
                        d="M5 8L11 18M11 8L5 18"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M16 4L19 7M19 4L16 7"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "number-list":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.46 7.41V11.56H6.65V6.05H5.7L4.05 7.16L4.52 8L5.46 7.41Z"
                        fill={color}
                    />
                    <path
                        d="M5.57 14.82C6.08 14.82 6.4 15.1 6.4 15.55C6.4 15.93 6.19 16.29 5.53 16.82L3.5 18.39V19.39H7.67V18.28H5.33L6.33 17.51C7.31 16.81 7.61 16.24 7.61 15.5C7.61 14.44 6.77 13.74 5.59 13.74C4.7 13.74 3.99 14.12 3.45 14.82L4.21 15.55C4.56 15.09 5.02 14.82 5.57 14.82Z"
                        fill={color}
                    />
                    <path
                        d="M6.56 24.64C7.15 24.39 7.56 23.89 7.56 23.37C7.56 22.5 6.78 21.86 5.56 21.86C4.67 21.86 3.98 22.22 3.46 22.87L4.15 23.59C4.5 23.16 4.91 22.95 5.45 22.95C5.99 22.95 6.37 23.21 6.37 23.61C6.37 24.02 6.01 24.23 5.37 24.23H4.79V25.23H5.43C6.17 25.23 6.5 25.44 6.5 25.86C6.5 26.28 6.15 26.54 5.5 26.54C4.88 26.54 4.39 26.31 4.04 25.89L3.34 26.67C3.87 27.29 4.65 27.6 5.55 27.6C6.84 27.6 7.68 26.91 7.68 25.96C7.68 25.34 7.27 24.84 6.56 24.64Z"
                        fill={color}
                    />
                    <path
                        d="M10 8H31.42"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M10 17H31.42"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                    <path
                        d="M10 25H31.42"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "bullet-list":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        cx="8"
                        cy="12"
                        r="3"
                        fill={color}
                    />
                    <circle
                        cx="8"
                        cy="24"
                        r="3"
                        fill={color}
                    />
                    <circle
                        cx="8"
                        cy="36"
                        r="2.67"
                        fill={color}
                    />

                    <path
                        d="M14 12H42"
                        stroke={color}
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <path
                        d="M14 24H42"
                        stroke={color}
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <path
                        d="M14 36H42"
                        stroke={color}
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
            );

        case "undo":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M9 7L5 11L9 15"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 11H14C17.3137 11 20 13.6863 20 17"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        case "redo":
            return (
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15 7L19 11L15 15"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M18 11H10C6.68629 11 4 13.6863 4 17"
                        stroke={color}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );

        default:
            return null;
    }
};

export default ToolbarSVG;
