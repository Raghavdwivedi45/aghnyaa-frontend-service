"use client";

import React, { useState } from 'react';
import styles from "./VideoPreviewToggle.module.scss";
import SVG from '@/components/SVG/SVG';
import Image from 'next/image';
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import { IVideoCardProps } from '@/constants/interfaces';
import { videoCardBottomRightIcons } from '@/constants/constants';
import { TagsType } from '@/constants/types';

const tagArray: TagsType[] = ["Advanced", "Beginner", "Darshana"]

const VideoCard = ({ onThumbnailClick, videoID, isPlaying }: IVideoCardProps) => {

    const hideThumbnail = () => {
        if (onThumbnailClick) {
            onThumbnailClick?.(videoID);
        }
    }

    return (
        <div className={styles["video-card"]}>
            <h4 className={styles["video-card-title"]}>Concept A - minimal apple</h4>

            <div className={styles["video-card-preview"]}>

                <div className={styles["video-card-img"]}>
                    <Image src={"/background.png"} fill alt={'Background image'} />

                    {
                        !isPlaying &&
                        <div onClick={hideThumbnail} className={styles["video-card-playback"]}>
                            <span className={styles["video-card-icon-span"]}>
                                <SVG type="playback-button-2" width={60} height={60} />
                            </span>
                        </div>
                    }

                    <div className={styles["video-card-bottom-icons"]}>
                        <div className={styles["video-card-bottom-left"]}>
                            <span className={styles["video-card-bottom-icon"]}><SVGWithText value='121' type="eye" color='var(--border)' width={16} height={16} /></span>
                        </div>

                        <div className={styles["video-card-bottom-right"]}>
                            {
                                videoCardBottomRightIcons.map((iconType, idx) => (<span key={idx} className={styles["video-card-bottom-icon"]}><SVG type={iconType} color='var(--border)' width={20} height={20} /></span>))
                            }
                        </div>

                    </div>

                    <div className={styles["video-card-top-right-tag"]}>Editor's Pick</div>

                    <div className={styles["video-card-top-left-author"]}>
                        <SVGWithText value='John Doe' src='/backgroundLightTheme.png' color='var(--border)' width={24} height={24} />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default VideoCard