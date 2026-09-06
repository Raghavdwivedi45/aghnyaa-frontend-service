import { Suspense } from "react";
import { fetchAllPublishedAuthors } from "@/utils/articleAPIs";
import Sidebar from "./_components/Sidebar/Sidebar";
import styles from "./layout.module.scss";

const layout = async ({ children }: { children: React.ReactNode }) => {
    const authors = (await fetchAllPublishedAuthors()) || [];

    return (
        <div className={styles["content-container"]}>
            <div className={styles["sidebar"]}>
                {/* Reads useSearchParams -> no URL at build time, so keep it out of the prerender. */}
                <Suspense fallback={null}>
                    <Sidebar authors={authors} />
                </Suspense>
            </div>

            <div className={styles["main-content"]}>{children}</div>
        </div>
    );
};

export default layout;