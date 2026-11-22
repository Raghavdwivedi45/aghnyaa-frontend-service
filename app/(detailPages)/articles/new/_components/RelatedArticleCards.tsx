import React from 'react';
import styles from './component.module.scss';
import { IArticleForm1 } from '@/constants/article.interfaces';
import Image from 'next/image';
import Checkbox from '@/components/Checkbox/Checkbox';

const RelatedArticleCards = ({
  articles,
  linkedArticles,
  onCardSelect,
}: {
  articles: IArticleForm1[];
  linkedArticles: string[];
  onCardSelect: (_id: string) => void;
}) => {
  const onClickCard = (_id: string | number) => {
    if (linkedArticles?.length >= 3) return;
    onCardSelect(_id?.toString());
  };

  return (
    <div className={styles['related-container']}>
      {articles.map((article, index) => (
        <div
          onClick={() => onClickCard(article?._id ?? '')}
          title={article?.title}
          key={index}
          className={styles['related-card']}
        >
          <div className={styles['related-checkbox']}>
            <Checkbox
              onCheck={onClickCard}
              id={article?._id ?? ''}
              checked={linkedArticles?.includes(article?._id)}
            />
          </div>
          <div className={styles['related-card-img']}>
            <Image src={article?.coverImage} fill alt={article?.title} />
          </div>
          <div className={styles['related-card-title']}>{article?.title}</div>
        </div>
      ))}
    </div>
  );
};

export default RelatedArticleCards;
