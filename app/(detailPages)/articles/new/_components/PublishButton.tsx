"use client";

import ButtonSet from '@/components/ButtonSet/ButtonSet'
import { IArticleForm1 } from '@/constants/article.interfaces';
import { fetchPOST, uploadImageToS3 } from '@/utils/fetchAPIFunctions';
import { getChangedFields, URLGenerator } from '@/utils/helperFunctions';
import { useRouter } from 'next/navigation';
import React from 'react'

const PublishButton = ({ articlePayload, originalPayload, coverImageFile }: { articlePayload: IArticleForm1, originalPayload: IArticleForm1, coverImageFile: File | null }) => {
    const router = useRouter();

    const isEdit = Boolean(articlePayload?.slug);
    const changedFields = getChangedFields(articlePayload, originalPayload);

    /* Editing without touching anything has nothing to send -> the buttons stay disabled until a field changes. */
    const nothingToSave = isEdit && Object.keys(changedFields).length === 0;

    const createNewArticle = async (fileKey?: string | null) => {
        // Create sends the whole form
        const body = fileKey ? { ...articlePayload, coverImage: fileKey } : articlePayload;
        const { data, error, status } = await fetchPOST<IArticleForm1>(URLGenerator("PUBLISH", `/protected/v1/articles/create-draft/`), body, {}, "POST");
        return { data, error, status }
    }

    const updateArticle = async (fileKey?: string | null) => {
        // edit sends only what the user touched.
        const body = fileKey ? { ...changedFields, coverImage: fileKey } : changedFields;
        const { data, error, status } = await fetchPOST<IArticleForm1>(URLGenerator("PUBLISH", `/protected/v1/articles/create-draft/${articlePayload?.slug}`), body, {}, "PATCH");
        return { data, error, status };
    }

    const handlePublishClick = async () => {
        let fileKey: string | null = null;
        if (coverImageFile) {
            const { data, error } = await uploadImageToS3(coverImageFile);
            if (error) { return; }
            fileKey = data
        }

        if (isEdit) {
            const { data } = await updateArticle(fileKey);
            router.replace(`/articles/${data?.status === "DRAFT" ? "new/" : ""}${data?.slug ?? ""}`)
        } else {
            const { data } = await createNewArticle(fileKey);
            router.replace(`/articles/${data?.status === "DRAFT" ? "new/" : ""}${data?.slug ?? ""}`)
        }
    }

    return (
        <ButtonSet
            primaryText='Upload'
            primaryDisabledText='Nothing to save yet'
            secondaryText='Preview'
            onPrimaryClick={handlePublishClick}
            onSecondaryClick={handlePublishClick}
            disablePrimary={nothingToSave}
            disableSecondary={nothingToSave}
        />
    )
}

export default PublishButton