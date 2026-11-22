import ButtonSet from '@/components/ButtonSet/ButtonSet';
import Modal from '@/components/Modal/Modal';
import React, { useEffect, useState } from 'react';
import styles from './component.module.scss';
import { IArticleForm1 } from '@/constants/article.interfaces';
import { fetchMyPublished } from '@/utils/articleAPIs.client';
import RelatedArticleCards from './RelatedArticleCards';
import Pagination from '@/components/Pagination/Pagination';
import { useSearchParams } from 'next/navigation';

const LinkRelatedArticles = ({
  handleModalSubmit,
}: {
  handleModalSubmit: (slugs: string[]) => void;
}) => {
  const searchParams = useSearchParams();
  const currPage = Number(searchParams.get('page'));

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [articles, setArticles] = useState<IArticleForm1[]>([]);
  const [linkedArticles, setLinkedArticles] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMyPublished({ excludeContent: true });
      setArticles(data?.articlesWithAuthors ?? []);
      setTotalPages(data?.totalPages ?? 0);
    };

    fetchData();
  }, []);

  const openModalFn = () => {
    setOpenModal(true);
  };

  const closeModalFn = () => {
    setOpenModal(false);
  };

  const onCardSelect = (_id: string) => {
    setLinkedArticles((prev) =>
      prev.includes(_id) ? prev.filter((el) => el !== _id) : [...prev, _id],
    );
  };

  const submitLinksAndCloseModal = () => {
    handleModalSubmit(linkedArticles);
    closeModalFn();
  };

  return (
    <>
      <ButtonSet primaryText="Link articles" primarySVG="link" onPrimaryClick={openModalFn} />
      {openModal && (
        <Modal
          closeModal={closeModalFn}
          heading={'Pick atmost 3 articles to link'}
          content={
            <RelatedArticleCards
              articles={articles}
              linkedArticles={linkedArticles}
              onCardSelect={onCardSelect}
            />
          }
          footer={
            <div className={styles['modal-footer']}>
              <div className={styles['relative-pagination']}>
                <Pagination currentPage={currPage} totalPages={totalPages ?? 0} />
              </div>
              <ButtonSet primaryText="Submit" onPrimaryClick={submitLinksAndCloseModal} />
            </div>
          }
        />
      )}
    </>
  );
};

export default LinkRelatedArticles;
