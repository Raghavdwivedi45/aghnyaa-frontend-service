"use client";

import React, { useEffect, useState } from 'react'
import PlayerFactory from '@/components/player/PlayerFactory'
import { IVideo, IVideoInfo } from '@/constants/interfaces'
import styles from "./VideoInfo.module.scss";
import NativePlayer from '@/components/player/NativePlayer';
import EmbedPlayer from '@/components/player/EmbedPlayer';
import SVG from '@/components/SVG/SVG';

const VideoInfo = ({ currentVideos }: IVideoInfo) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentVideo: IVideo = currentVideos[currentIndex];


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentVideos.length);
    }, 4000); // 4 seconds per slide

    // Clear timer when component unmounts
    return () => clearInterval(timer);
  }, [currentVideos.length]);

  const handleDotClick = (index: number) => {
    if (currentIndex === 0 && index < 0) {
      setCurrentIndex(currentVideos.length - 1);
    }
    else {
      setCurrentIndex((currentIndex) => (currentIndex + index) % currentVideos.length);
    }
  };

  return (
    <div className={styles.playerContainer}>
      <div onClick={() => handleDotClick(-1)} className={styles.navButtonPrev}>
        <SVG type='next' height={48} width={48} color='var(--text-secondary)' />
      </div>

      <div className={styles.player}>
        {
          currentVideo?.videoURL && (<NativePlayer src={currentVideo.videoURL} />)
        }
        {
          currentVideo?.embedUrl && (<EmbedPlayer currentVideo={currentVideo} />)
        }
        {
          !currentVideo?.embedUrl && !currentVideo?.videoURL && <div>Unable to play this video.</div>
        }
      </div>

      <div onClick={() => handleDotClick(1)} className={styles.navButtonNext}>
        <SVG type='next' height={48} width={48} color='var(--text-secondary)' />
      </div>
    </div>
  )
}

export default VideoInfo
