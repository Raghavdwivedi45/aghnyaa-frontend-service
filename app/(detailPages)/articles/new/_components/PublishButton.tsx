'use client';

import ButtonSet from '@/components/ButtonSet/ButtonSet';
import { IArticleForm1 } from '@/constants/article.interfaces';
import { ToasterContext } from '@/contexts/ToasterContext';
import { createArticleDraft, updateArticleDraft } from '@/utils/articleAPIs.client';
import { uploadImageToS3 } from '@/utils/fetchAPIFunctions';
import { getChangedFields } from '@/utils/helperFunctions';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const PublishButton = ({
  articlePayload,
  originalPayload,
  coverImageFile,
}: {
  articlePayload: IArticleForm1;
  originalPayload: IArticleForm1;
  coverImageFile: File | null;
}) => {
  const router = useRouter();
  const isEdit = Boolean(articlePayload?.slug);
  const changedFields = getChangedFields(articlePayload, originalPayload);
  const { setErrorList, setSuccessList } = useContext(ToasterContext);

  /* Editing without touching anything has nothing to send -> the buttons stay disabled until a field changes. */
  const nothingToSave = isEdit && Object.keys(changedFields).length === 0;

  const createNewArticle = useMutation({
    mutationFn: createArticleDraft, // Create sends the whole form
    onSuccess: ({ data, errors }) => {
      if (errors && errors.length > 0) {
        for (const error of errors) setErrorList(error);
        return;
      }
      if (data)
        router.replace(`/articles/${data?.status === 'DRAFT' ? 'new/' : ''}${data?.slug ?? ''}`);
    },
  });

  const updateArticle = useMutation({
    mutationFn: updateArticleDraft,
    onSuccess: ({ data, message }) => {
      if (data)
        router.replace(`/articles/${data?.status === 'DRAFT' ? 'new/' : ''}${data?.slug ?? ''}`);
      setSuccessList(message);
    },
  });

  const handlePublishClick = async () => {
    let fileKey: string | null = null;
    if (coverImageFile) {
      const { data, error } = await uploadImageToS3(coverImageFile);
      if (error) return;
      fileKey = data;
    }

    if (isEdit) {
      const body = fileKey ? { ...changedFields, coverImage: fileKey } : changedFields; // edit sends only what the user touched.
      updateArticle.mutate({ body, slug: articlePayload?.slug || '' });
    } else {
      const body = fileKey ? { ...articlePayload, coverImage: fileKey } : articlePayload;
      createNewArticle.mutate(body);
    }
  };

  return (
    <ButtonSet
      primaryText="Upload"
      primaryDisabledText="Nothing to save yet"
      secondaryText="Preview"
      onPrimaryClick={handlePublishClick}
      onSecondaryClick={handlePublishClick}
      disablePrimary={nothingToSave}
      disableSecondary={nothingToSave}
    />
  );
};

export default PublishButton;
