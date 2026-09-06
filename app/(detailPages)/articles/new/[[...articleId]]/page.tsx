import React from 'react'
import styles from "./page.module.scss";
import CreateArticleMid from '../_components/CreateArticleMid';
import { ICreateArticleProps } from '@/constants/interfaces';
import { IArticleForm1 } from '@/constants/article.interfaces';
import { fetchArticleInfo } from '@/utils/articleAPIs';

const page = async ({ params }: ICreateArticleProps) => {
  /* Optional catch all -> /articles/new gives undefined (create), /articles/new/<id> gives [id] (edit). */
  const { articleId } = await params;
  const slug = articleId?.[0] ?? null;
  const article = await fetchArticleInfo(slug);
  if (articleId && !article) return <div>Empty</div>

  const myPayload: IArticleForm1 = {
    ...article,
    _id: slug ?? undefined,
    tags: article?.tags ?? [],
  }

  if (article?.status === "EDITED") {
    return (
      <div className={styles["new-article-container"]}>
        <p>You cannot edit an edited article</p>
      </div>
    )
  }

  return (
    <div className={styles["new-article-container"]}>
      <CreateArticleMid parentPayload={myPayload} />
    </div>
  )
}

export default page