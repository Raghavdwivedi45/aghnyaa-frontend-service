"use client";

import React from 'react'
import styles from "./Pagination.module.scss";
import SVG from '../SVG/SVG';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
    const currentPageNum = Number(currentPage);
    const totalPagesNum = Number(totalPages);

    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    return (
        <div className={styles['pagination-container']}>
            <button className={styles["page-box"]} disabled={!currentPageNum || currentPageNum === 1} onClick={() => changePage(currentPageNum + 1)}>
                {<SVG type='leftArrow' />}
            </button>

            {
                Array.from({ length: totalPagesNum }, (_, index) => {
                    const page = index + 1;

                    return (
                        <button key={page} onClick={() => changePage(page)} disabled={page === currentPageNum} className={page === currentPageNum ? styles["page-box-active"] : styles["page-box"]}>
                            {page}
                        </button>
                    );
                })
            }

            <button className={styles["page-box"]} disabled={!currentPageNum || currentPageNum === totalPages} onClick={() => changePage(currentPageNum - 1)}>
                {<SVG type='rightArrow' />}
            </button>
        </div >
    )
}

export default Pagination;