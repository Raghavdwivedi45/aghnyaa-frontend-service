import Link from 'next/link'
import styles from "./ArticleContent.module.scss";
import React, { useContext } from 'react'
import SVG from '@/components/SVG/SVG';
import { AuthContext } from '@/contexts/AuthContext';

const EditLink = ({ slug, authorId }: { slug: string, authorId: string }) => {

    const { user } = useContext(AuthContext);

    if (user?._id !== authorId) return null;
    
    return (
        <Link href={`/articles/new/${slug}`} className={styles['hero-edit-button']}>
            <SVG type="pencil" color='var(--text)' />
        </Link>
    )
}

export default EditLink