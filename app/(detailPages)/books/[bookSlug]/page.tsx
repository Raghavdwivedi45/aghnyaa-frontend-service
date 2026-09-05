import { IBreadCrumb, IShowBooksProps } from '@/constants/interfaces'
import React from 'react'
import styles from "./page.module.scss";
import Image from 'next/image';
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import ButtonSet from '@/components/ButtonSet/ButtonSet';
import ChapterDetails from "./_components/ChapterDetails";
import Accordion from '@/components/Accordion/Accordion';
import Comments from '@/components/Comments/Comments';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { bookStats } from '@/constants/constants';

const page = async ({ params }: IShowBooksProps) => {

    const { bookSlug } = await params;
    const breadcrumbArray: IBreadCrumb[] = [{ route: "/books", text: "Books" }, { route: `/books/${bookSlug}`, text: "Isha Upanishad" }]

    return (
        <div className={styles['book-index-container']}>
            <BreadCrumbs breadcrumbArray={breadcrumbArray} />

            <div className={styles["book-img-top-info"]}>
                <div className={styles["book-img"]}>
                    <Image src="/background.png" alt="" fill />
                </div>

                <div className={styles["book-info"]}>
                    <h1 className={styles["book-title"]}>Isha Upanishad</h1>
                    <h2 className={styles["book-title-sanskrit"]}>ईशा उपनिषद्</h2>

                    <p className={styles["book-description"]}>
                        A profound scripture from the Vedas that reveals the harmony between
                        the individual self and the Supreme. It is the essence of all spiritual
                        wisdom, guiding us from ignorance to illumination.
                    </p>

                    <div className={styles["book-stats"]}>
                        {
                            bookStats.map((stat, idx) => (
                                <div key={idx} className={styles["book-stat"]}>
                                    <SVGWithText type={stat.type} value={stat.value} height={20} width={20} />
                                    <span className={styles["book-stat-label"]}>{stat.label}</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className={styles["book-actions"]}>
                        <div className={styles["book-actions-button"]}>
                            <ButtonSet primaryText='Read Book' primarySVG='book' showSecondary={false} />
                        </div>

                        <div className={styles["book-quick-actions"]}>
                            <SVGWithText color='var(--text-secondary)' withDesign={true} index={0} type='bookmark' value='Bookmark' />
                            <SVGWithText withDesign={true} index={1} type='heart' value='Favorite' />
                            <SVGWithText withDesign={true} index={2} type='share' value='Share' />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles["book-chapters-container"]}>
                <h4 className={styles["book-chapters-heading"]}>Table of Contents</h4>
                <h2 className={styles["book-chapters-subheading"]}>Journey Through the wisdom</h2>

                <ChapterDetails bookSlug={bookSlug} />
            </div>

            <div className={styles["chapter-comments"]}>
                <Accordion additionalIcon='comment' heading='Comments'>
                    <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much. Such a nice one. Enjoyed it so much. Such a nice one. Enjoyed it so much. Such a nice one. Enjoyed it so much. Such a nice one. Enjoyed it so much. ' />
                    <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much.' />
                    <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much.' />
                    <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much.' />
                    <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much.' />
                </Accordion>
            </div>
        </div>
    )
}

export default page
