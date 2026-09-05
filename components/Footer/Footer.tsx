import React from 'react';
import styles from "./Footer.module.scss";
import Link from 'next/link';
import {
    BRAND_NAME,
    footerTagLine,
    footerLinkColumns,
    footerSocialLinks,
} from "@/constants/constants";
import SVG from '../SVG/SVG';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className={styles['footer']}>
            <div className={styles['footer-top']}>
                <div className={styles['footer-brand']}>
                    <div className={styles['footer-brand-name']}>{BRAND_NAME}</div>
                    <p className={styles['footer-tagline']}>{footerTagLine}</p>
                    <div className={styles['footer-socials']}>
                        {footerSocialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.href}
                                aria-label={social.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles['footer-social-link']}
                            >
                                <SVG type={social.icon} height={20} width={20} />
                            </a>
                        ))}
                    </div>
                </div>

                <div className={styles['footer-links']}>
                    {footerLinkColumns.map((column, index) => (
                        <div key={index} className={styles['footer-link-column']}>
                            <div className={styles['footer-link-heading']}>{column.heading}</div>
                            {column.links.map((link, linkIndex) => (
                                <Link
                                    key={linkIndex}
                                    href={link.endpoint}
                                    className={styles['footer-link']}
                                >
                                    {link.text}
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles['footer-bottom']}>
                <span>© {year} {BRAND_NAME}. All rights reserved.</span>
            </div>
        </footer>
    );
};

export default Footer;