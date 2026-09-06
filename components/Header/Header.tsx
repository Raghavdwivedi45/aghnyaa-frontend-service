"use client";

import React, { useContext } from 'react';
import styles from "./Header.module.scss";
import { BRAND_NAME, headerNavLinks } from "@/constants/constants";
import Link from 'next/link';
import SVG from '../SVG/SVG';
import { AuthContext } from '@/contexts/AuthContext';
import { fetchPOST } from '@/utils/fetchAPIFunctions';
import { URLGenerator } from '@/utils/helperFunctions';

const Header = () => {
    const { user, setUser } = useContext(AuthContext);

    const logout = async () => {
        const { data } = await fetchPOST(URLGenerator("USER", "/protected/v1/auth/logout"));
        if (data) {
            setUser(null)
        }
    }

    return (
        <div className={styles['header-fixed-container']}>
            <div className={styles['header-fixed-container-left']}>
                <Link href={"/"}>{BRAND_NAME}</Link>
            </div>

            <div className={styles['header-fixed-container-mid']}>
                {
                    headerNavLinks.map((navLink, index) => {
                        return (
                            <div key={index} className={styles['header-nav-link']}>
                                <Link href={navLink.endpoint}>{navLink.text}</Link>
                            </div>
                        )
                    })
                }
            </div>

            <div className={styles['header-fixed-container-right']}>
                {
                    !user &&
                    <Link title='Register / Login' href="/signup">
                        <SVG color='var(--text)' type='signup' height={24} width={24} />
                    </Link>
                }
                {
                    user &&
                    <Link title='User Settings' href="/settings">
                        <SVG color='var(--text)' type='settings' height={24} width={24} />
                    </Link>
                }
                {
                    user &&
                    <Link title='Logout' href="/" onClick={logout}>
                        <SVG color='var(--text)' type='signout' height={24} width={24} />
                    </Link>
                }
            </div>
        </div>
    )
}

export default Header