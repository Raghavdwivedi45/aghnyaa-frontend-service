import React from 'react';
import styles from "./page.module.scss";
import ChapterSidebar from './_components/ChapterSidebar/ChapterSidebar';
import { chapterContents } from '@/constants/MOCK_DATA';
import ChapterDetails2 from './_components/ChapterDetails2/ChapterDetails2';

const page = () => {

  return (
    <div className={styles["chapter-container"]}>
      <ChapterSidebar chapterContents={chapterContents} />
      <ChapterDetails2 />
    </div>
  )
}

export default page