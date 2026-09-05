"use client";

import React, { useState } from 'react';
import styles from "./BookCard.module.scss";
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import Image from 'next/image';
import SVG from '@/components/SVG/SVG';
import { useRouter } from 'next/navigation';

const BookCard = ({ index }: { index: number }) => {
    const id = "123";

    const router = useRouter();
    const readBook = (bookID: string) => {
        router.push(`/books/${bookID}`);
    }

    const [showDetails, setShowDetails] = useState<boolean>(false);

    const showDetailsOrCover = () => {
        setShowDetails((prev) => !prev);
    }



    return (
        <div className={styles['card-container']}>

            <div className={showDetails ? `${styles["book-cover-img"]} ${styles["hide"]}` : `${styles["book-cover-img"]} ${styles["show"]}`}>
                <Image fill src={"/background.png"} alt='' />

                <div className={styles["book-cover-icons"]}>
                    <p title='Love' className={styles["book-icon-svg"]}><SVG type='heart' color='var(--text-tertiary)' /></p>
                    <p title='Share' className={styles["book-icon-svg"]}><SVG type='share' color='var(--text-tertiary)' /></p>
                </div>
            </div>

            <div className={showDetails ? `${styles["book-information"]} ${styles["hide"]}` : `${styles["book-information"]} ${styles["show"]}`}>
                <h3>Isha Upanishad</h3>
                <p>by Vedvyasa</p>
                <div className={styles["book-tags"]}>
                    <SVGWithText index={index} withDesign={true} type='language' value='Sanskrit' />
                    <SVGWithText index={index + 3} withDesign={true} type='calendar' value='12 Jun, 2026' />
                </div>
            </div>



            <div className={!showDetails ? `${styles["book-description"]} ${styles["hide"]}` : `${styles["book-description"]} ${styles["show"]}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eum quo a molestiae in inventore, corrupti fugiat explicabo repellendus neque quas qui officiis quae suscipit incidunt aliquid culpa mollitia perspiciatis?
                Officia reiciendis magnam laboriosam itaque, illum veniam beatae rerum incidunt sapiente debitis earum omnis qui voluptatibus necessitatibus consequuntur soluta veritatis unde. Vitae, similique quo. Sapiente vitae praesentium doloremque eius mollitia!
                Iusto et distinctio, minus necessitatibus ducimus aspernatur. Nam deleniti reiciendis hic officiis tempore est dignissimos quod pariatur necessitatibus consectetur. Animi ea voluptatibus voluptates? Assumenda, blanditiis vero facere iste odio beatae.
                Labore placeat, distinctio repellat est fugit cum itaque odit rem recusandae eveniet explicabo beatae dolor porro, ut reprehenderit dolores quidem architecto iste in illum fuga earum? Culpa voluptatibus non placeat?
                Error tempore atque molestias maiores dolore omnis saepe ipsum corrupti assumenda sit ab aut dignissimos in, voluptatem at voluptatum, maxime rem. Quaerat perspiciatis quisquam placeat, magnam possimus natus et cumque!
                Nisi, vitae dolores veritatis excepturi natus ad, quas obcaecati architecto nostrum mollitia unde consequuntur inventore iste voluptatum suscipit sequi nihil soluta ea accusantium magnam totam maiores aliquam! Accusantium, id a!
                Placeat modi at dignissimos magnam ex quo. Dignissimos tempore et dolorem odit quae nesciunt quas aperiam error, minus sed quaerat distinctio eligendi quos, odio vero, unde commodi iusto voluptatum mollitia!
                Voluptatibus atque repellendus aliquam maxime. Quaerat, illum error? Exercitationem libero, voluptates ex nesciunt eos ipsum laborum veniam. Iste, quidem consequuntur! A doloribus nostrum sed ipsum iure corrupti earum recusandae velit.
                Tempore molestiae nam, beatae minima libero eum, incidunt quis magni eligendi impedit, tenetur ab exercitationem nesciunt numquam aspernatur dolorem nulla excepturi amet aut eveniet tempora quam reprehenderit. Voluptatum, possimus fuga.
                Iste ratione impedit dolor. Esse voluptatem sequi dolores debitis, accusantium modi illo ipsa exercitationem consectetur magni incidunt ducimus inventore repellendus alias sint rerum. Minima, quidem. Veniam eaque quia sed modi!
            </div>




            <div className={styles["book-footer"]}>
                <button onClick={() => readBook(id)} className={styles["book-footer-button1"]}>
                    <SVGWithText type='eye' value='Preview' />
                </button>
                <button onClick={showDetailsOrCover} className={styles["book-footer-button2"]}>
                    <SVGWithText type='error' value={showDetails ? 'Cover' : 'Details'} />
                </button>
            </div>
        </div>
    )
}

export default BookCard;