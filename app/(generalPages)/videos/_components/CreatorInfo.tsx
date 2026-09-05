import React from 'react';
import styles from "./VideoPreviewToggle.module.scss";
import Image from 'next/image';
import SVGWithText from '@/components/SVGWithText/SVGWithText';
import ButtonSet from '@/components/ButtonSet/ButtonSet';
import Link from 'next/link';

const CreatorInfo = () => {
  return (
    <div className={styles['creator-info-container']}>

      <div className={styles["creator-img-div"]}>
        <div className={styles["creator-img"]}>
          <Image src={"/background.png"} fill alt='' />
        </div>
      </div>
      <div className={styles["creator-info"]}>
        <h3 className={styles["creator-name"]}>
          <Link href={"/"}>Shri Rajendra das Ji Maharaj</Link>
        </h3>

        <div className={styles["creator-tags"]}>
          <SVGWithText withDesign={true} index={4} value={"#TagName"} />
          <SVGWithText withDesign={true} index={5} value={"#TagName2"} />
          <SVGWithText withDesign={true} index={6} value={"#TagName3"} />
          <SVGWithText withDesign={true} index={7} value={"#TagName4"} />
        </div>

        <p className={styles["creator-reach"]}>
          <b>1.2M</b> followers &nbsp;|&nbsp; 
          <b> 4.2K</b> Videos &nbsp;|&nbsp; 
          <b> 3.1K</b> Articles &nbsp;|&nbsp; 
          <b> 1K</b> Books 
        </p>

        <div className={styles["creator-follow-button"]}>
          <ButtonSet SVGPosition="right" primarySVG='' primaryText='Follow' />
        </div>



      </div>
    </div>
  )
}

export default CreatorInfo;