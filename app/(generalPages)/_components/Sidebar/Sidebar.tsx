"use client";

import { useState } from "react";
import styles from "./Sidebar.module.scss";
import SVG from "@/components/SVG/SVG";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown/Dropdown";
import { articleCategory, articleTags } from "@/constants/article.constants";
import CalendarInput from "@/components/Input/CalendarInput";
import MultiSelectDropdown from "@/components/Dropdown/MultiSelectDropdown";
import { IAllAuthors } from "@/constants/article.interfaces";


const Sidebar = ({ authors }: { authors: IAllAuthors[] }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [opened, setOpened] = useState(false);

    const createdAfterParam = searchParams?.get("createdAfter");
    const createdBeforeParam = searchParams?.get("createdBefore");
    const categoryParam = searchParams?.get("categories");
    const tagsParam = searchParams?.get("tags");
    const authorsParam = searchParams?.get("authors");

    const authorList = authors.map((author) => ({ key: author._id, text: author.username }))

    const handleSidebarOpening = () => {
        setOpened((prev) => !prev)
    }

    const addFilter = (key: "category" | "tags" | "authors" | "createdAfter" | "createdBefore", value: string | string[]) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value === "" || (Array.isArray(value) && value.length === 0)) {
            params.delete(key);
        } else {
            params.set(key, Array.isArray(value) ? value.join(",") : value);
        }

        router.push(`${pathname}?${params.toString()}`);
    }

    const toggleMultiParams = (key: "tags" | "authors", value: string | number) => {
        if (key === "tags") {
            const current = tagsParam ? tagsParam.split(",").filter(Boolean) : [];
            const selected = value?.toString() ?? "";
            const next = current.includes(selected)
                ? current.filter((tag) => tag !== selected)
                : [...current, selected];

            addFilter("tags", next);
        }
        else if (key === "authors") {
            const current = authorsParam ? authorsParam.split(",").filter(Boolean) : [];
            const selected = value?.toString() ?? "";
            const next = current.includes(selected)
                ? current.filter((tag) => tag !== selected)
                : [...current, selected];

            addFilter("authors", next);
        }
    }

    if (pathname?.toString().endsWith("/new")) {
        return null;
    }

    return (
        <div className={`${styles["sidebar-container"]} ${opened ? styles["opened"] : styles["closed"]}`}>
            <div title={opened ? "Close" : "Open"} className={styles["opener-thread"]} onClick={handleSidebarOpening} >
                <SVG type="thread" height={64} width={24} color="var(--button-primary-text)" />
            </div>

            {
                opened &&
                <div className={styles["inner-sidebar-content"]}>
                    <Dropdown placeholder="All Categories" dropdownList={articleCategory} selectedValue={categoryParam ?? ""} onOptionSelect={(val) => addFilter("category", [val?.toString()])} />
                    <MultiSelectDropdown placeholder="All Tags" dropdownList={articleTags} selectedValues={tagsParam ? tagsParam.split(",").filter(Boolean) : []} onOptionSelect={(value) => toggleMultiParams("tags", value)} />
                    <MultiSelectDropdown placeholder="All Authors" dropdownList={authorList} selectedValues={authorsParam ? authorsParam.split(",").filter(Boolean) : []} onOptionSelect={(val) => toggleMultiParams("authors", val)} />
                    <CalendarInput title="Created After" value={createdAfterParam ? Number(createdAfterParam) : null} onInputChange={(date) => addFilter("createdAfter", date.toString())} />
                    <CalendarInput title="Created Before" value={createdBeforeParam ? Number(createdBeforeParam) : null} onInputChange={(date) => addFilter("createdBefore", date.toString())} />
                </div>
            }
        </div>
    );
};

export default Sidebar;
