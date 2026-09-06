import React from "react";
import styles from "./allBooks.module.scss";
import BookCard from "../_components/BookCard/BookCard";

export default function Page() {

    return (
        <div className={styles["card-container"]}>
            {
                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                    .map((el, idx) => <BookCard index={idx} key={idx} />)
            }
        </div>
    );
};
