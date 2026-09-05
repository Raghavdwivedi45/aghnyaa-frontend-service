"use client";

import { IThumbnail, IVideo } from "@/constants/interfaces";
import Image from "next/image";
import { useState } from "react";
import styles from "./player.module.scss";
import SVG from "../SVG/SVG";
import SVGWithText from "../SVGWithText/SVGWithText";
import ButtonSet from "../ButtonSet/ButtonSet";


export default function EmbedPlayer({ currentVideo, isStarted = false }: { currentVideo: IVideo, isStarted? : boolean }) {
    const [started, setStarted] = useState(isStarted || false);

    if (!started) {
        return (
            <div onClick={() => setStarted(true)} className={styles["thumbnail-container"]}>
                <Image src={currentVideo?.thumbnail?.url} fill alt="" />

                <div className={styles["playback-button"]}>
                    <SVG type="playback-button" height={64} width={64} color="var(--button-secondary-bg-hover)" />
                </div>

                <div className={styles["video-duration"]}>
                    <SVGWithText value={currentVideo?.duration} type="clock" color="var(--button-secondary-bg-hover)" />
                </div>

                <div className={styles["video-title"]}>
                    <h2 className={styles["video-title-head"]}>{currentVideo.title}</h2>
                    <div className={styles["video-title-buttons"]}>
                        <ButtonSet
                            primaryText='Love' primarySVG='heart' onPrimaryClick={() => { }}
                            secondarySVG='share' secondaryText='Share' onSecondaryClick={() => { }}
                        />
                    </div>
                </div>

                <div className={styles["video-tag"]}>
                    <ButtonSet showPrimary={false} secondaryText={currentVideo.tag} />
                </div>
            </div>
        )
    }

    return (
        <div className={styles["iframe-container"]}>
            <iframe
                src={currentVideo?.embedUrl}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                style={{
                    width: "100%",
                    height: "100%",
                    border: "inherit",
                }}
            />
        </div>
    );
}