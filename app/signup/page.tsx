import React from 'react';
import styles from "./page.module.scss";
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import { avatarGroup, signupCards } from '@/constants/constants';
import SVG from '@/components/SVG/SVG';
import Image from 'next/image';
import ActionButton from './_components/ActionButton';
import SignupInputGroup from './_components/SignupInputGroup';

const page = () => {
    return (
        <div className={styles["signup-container"]}>
            <div className={styles["left-part"]}>
                <div className={styles["left-part-top-icon"]}>
                    <SVGWithText type="document" value="Your Journey to Wisdom Begins" />
                </div>
                <h1>Get Signed into Timeless Wisdom</h1>
                <p>Create your account and explore sacred texts, spiritual knowledge, and meaningful learning experience</p>

                <div className={styles["signup-cards"]}>
                    {
                        signupCards.map((card, idx: number) => (
                            <div key={idx} className={styles["card"]}>
                                <div className={styles["card-img"]}>
                                    <SVG type={card.type} />
                                </div>
                                <div className={styles["card-text"]}>
                                    {card?.value}
                                </div>
                            </div>
                        ))
                    }
                </div>

                <div className={styles.avatarGroup}>
                    {
                        avatarGroup.map((avatarSrc, index) => (
                            <div key={index} className={styles.avatar} style={{ zIndex: index }}>
                                {/* sizes tells the browser the rendered width (48px avatar), so it downloads a small image instead of assuming 100vw with `fill` */}
                                <Image src={avatarSrc} alt="" fill sizes="48px" />
                            </div>
                        ))
                    }
                    <div className={styles["avatar-text"]}>Join 2500+ learners <br /> exploring timeless knowledge</div>
                </div>

                <ActionButton />
            </div>
            <div className={styles["right-part"]}>
                <div className={styles["right-part-top-icon"]}>
                    <SVG type='signup-designed' />
                </div>
                <h3>Create Your Account</h3>
                <p className={styles["right-part-text"]}>Start your personalised spiritual learning</p>
                <div className={styles["right-input-group"]}>
                    <SignupInputGroup />
                </div>
            </div>
        </div>
    )
}

export default page