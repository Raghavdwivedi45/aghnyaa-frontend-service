import React from 'react';
import styles from "./BreadCrumbs.module.scss";
import Link from 'next/link';
import SVG from '../SVG/SVG';
import { IBreadCrumb } from '@/constants/interfaces';

const BreadCrumbs = ({ breadcrumbArray }: { breadcrumbArray: IBreadCrumb[] }) => {
    // route should be starting with "/" -> like "/articles/123", "/books" etc.
    return (
        <div className={styles["page-breadcrumbs"]}>
            <Link href="/"><SVG type='home' height={16} width={16} /></Link>
            <Link href="/"><span>{">"}</span></Link>
            {
                breadcrumbArray.map((el, idx: number) => (
                    <Link key={idx} href={el?.route || "/"}>{el?.text} {idx<breadcrumbArray.length-1 ? ">" : ""} </Link>
                ))
            }
        </div>
    )
}

export default BreadCrumbs