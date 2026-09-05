"use client";

import React, { useState } from 'react';
import styles from "./VideoPreviewToggle.module.scss";
import SVG from '@/components/SVG/SVG';
import VideoCard from './VideoCard';
import { sampleVideo } from '@/constants/MOCK_DATA';
import EmbedPlayer from '@/components/player/EmbedPlayer';
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import { videoCardMetaData } from '@/constants/constants';
import Accordion from '@/components/Accordion/Accordion';
import Comments from '@/components/Comments/Comments';
import CreatorInfo from './CreatorInfo';

const VideoPreviewToggle = () => {
  const [isPreviewOpened, setIsPreviewOpened] = useState<boolean>(false);
  const [PlayingVideoID, setPlayingVideoID] = useState<string | null>(null);

  const togglePreviewOpenedState = () => {
    setIsPreviewOpened(prev => !prev);
  }

  const onVideoCardClick = (videoId: string) => {
    console.log("Video card clicked with ID:", videoId);
    setPlayingVideoID(videoId);
    setIsPreviewOpened(true);
  }

  return (
    <div className={styles['videos-preview-container']}>

      <div className={isPreviewOpened ? styles["videos-container-shrinked"] : styles["videos-container-opened"]}>
        {
          sampleVideo.map((item, idx) => (
            <VideoCard isPlaying={PlayingVideoID === item?.id?.toString()} videoID={item?.id?.toString()} onThumbnailClick={onVideoCardClick} key={idx} />
          ))
        }
      </div>

      <div className={isPreviewOpened ? styles["preview-container-opened"] : styles["preview-container-shrinked"]}>

        <div onClick={togglePreviewOpenedState} className={styles['preview-top-icons']}>
          {
            isPreviewOpened ?
              (<SVG type='minimize' color='var(--border)' height={16} width={16} />)
              :
              (<SVG type='maximize' color='var(--border)' height={16} width={16} />)
          }
        </div>

        {
          isPreviewOpened && PlayingVideoID &&
          (
            <>
              <div className={styles['video-player-container']}>
                <EmbedPlayer isStarted={true} currentVideo={sampleVideo.filter((video) => video?.id?.toString() === PlayingVideoID)[0]} />
              </div>

              <div className={styles['video-meta-data']}>
                {
                  videoCardMetaData.map((metaData, idx) => {
                    return (
                      <SVGWithText key={idx} withDesign={true} index={idx} type={metaData?.type || "eye"} value={metaData?.value || ""} height={metaData?.height || 16} width={metaData?.width || 16} />
                    )
                  })
                }
              </div>

              <CreatorInfo/>

              <Accordion additionalIcon='comment' heading='Comments'>
                <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much. Such a nice one. Enjoyed it so much. Such a nice one. Enjoyed it so much. Such a nice one. Enjoyed it so much. Such a nice one. Enjoyed it so much. '/>
                <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much.'/>
                <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much.'/>
                <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much.'/>
                <Comments username='Meera Sharma' createdAt="01 July, 2026" commentContent='Such a nice one. Enjoyed it so much.'/>
              </Accordion>
            </>
          )
        }

      </div>


    </div>
  )
}

export default VideoPreviewToggle