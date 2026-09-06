"use client";

import React, { useState } from 'react'
import styles from "./component.module.scss";
import Input from '@/components/Input/Input';
import FileInput from '@/components/Input/FileInput';
import Tiptap from '@/components/Tiptap/Tiptap';
import Dropdown from '@/components/Dropdown/Dropdown';
import { articleCategory, articleTags, publishingOptions } from '@/constants/article.constants';
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import Toggle from '@/components/Toggle/Toggle';
import SVG from '@/components/SVG/SVG';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { newArticleBreadcrumbs } from '@/constants/constants';
import PublishButton from './PublishButton';
import { IArticleForm1 } from '@/constants/article.interfaces';

const CreateArticleMid = ({ parentPayload }: { parentPayload: IArticleForm1 }) => {
  const [payload, setPayload] = useState<IArticleForm1>(parentPayload);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const updatePayload = (key: keyof IArticleForm1, value: string | number | string[] = "") => {
    if (key === "isFeatured") {
      setPayload((prev) => ({ ...prev, isFeatured: !prev.isFeatured }));
      return;
    }

    if (key === "tags") {
      if (!Array.isArray(value)) return;
      setPayload((prev) => ({ ...prev, tags: [...value] }));
      return;
    }

    setPayload((prev) => ({ ...prev, [key]: value }));
  }

  const addTag = (tag: string) => {
    const cleaned = tag?.trim();
    if (!cleaned || payload.tags.includes(cleaned)) return;
    updatePayload("tags", [...payload.tags, cleaned]);
  }

  const removeTag = (tag: string) => {
    updatePayload("tags", payload.tags.filter((el) => el !== tag));
  }

  const updateFile = (file: File | null) => {
    // payload's field "coverIImage" will be handled mainly in the PublishButton component, 
    // swe just need to store the file here and temporarily change the field so that getChangedFields can detect a change in the payload and enable the publish button inside <PublishButton/>.
    updatePayload("coverImage", file?.name || "");
    setCoverImageFile(file);
  }

  return (
    <>
      <div className={styles["new-article-top"]}>

        <div>
          <BreadCrumbs breadcrumbArray={newArticleBreadcrumbs} />
          <h2>Create New Article</h2>
          <h5>Share your knowledge with the world</h5>
        </div>

        <div>
          <PublishButton articlePayload={payload} originalPayload={parentPayload} coverImageFile={coverImageFile} />
        </div>

      </div>
      <div className={styles["new-article-mid"]}>
        <div className={styles["new-article-mid-left"]}>
          <Input value={payload?.title} onInputChange={(value) => updatePayload("title", value?.toString())} placeholder="Enter a compelling title for your article" title="Title" necessaryInput={true} maxCharCount={150} />
          <Input value={payload?.excerpt} isTextArea={true} textAreaProperties={{ resize: false, rows: 3, columns: null }} onInputChange={(value) => updatePayload("excerpt", value?.toString())} placeholder="Write a short summary for your article" title="Excerpt" necessaryInput={true} maxCharCount={250} />
          <FileInput onFileUpload={(file: File | null) => updateFile(file)} presetFilename={payload?.coverImage} />

          <Tiptap content={payload?.content} updateContent={(content) => updatePayload("content", content)} />
          <Dropdown
            type="tagsinput"
            title="Tags"
            placeholder="Search tags from the list"
            allowCustomTags={false}
            dropdownList={articleTags}
            selectedValue=""
            selectedTags={payload?.tags}
            onOptionSelect={(value) => addTag(value?.toString())}
            onTagRemove={removeTag}
          />

          <Dropdown placeholder='Category' selectedValue={payload?.category} dropdownList={articleCategory} onOptionSelect={(value) => updatePayload("category", value?.toString())} />
        </div>
        <div className={styles["new-article-mid-right"]}>
          <h4>Publishing Options</h4>

          <span className={styles["right-title"]}>Status</span>
          <RadioGroup name="status" value={payload.status} options={publishingOptions} onChange={(value) => updatePayload("status", value)} />
          <hr className={styles['right-divider']} />

          <Toggle label="Featured Article" isToggledOn={payload?.isFeatured} onToggleUpdate={() => updatePayload("isFeatured")} description='Want to mark this article as featured ?' />
          <hr className={styles['right-divider']} />

          <Input value={payload?.readTime} onInputChange={(value) => updatePayload("readTime", value)} inputType="number" placeholder="Enter a compelling title for your article" title="Estimated Reading time (in minutes)" necessaryInput={true} />
          <hr className={styles['right-divider']} />

          <div className={styles["writing-tips-container"]}>
            <h4 className={styles["writing-tips-head"]}>
              <SVG type='bulb' />
              Writing Tips
            </h4>

            <ul className={styles["writing-tips-list"]}>
              <li>Write a clear engaging title</li>
              <li>Add a compelling excerpt</li>
              <li>Use relevant tags and category</li>
              <li>Include high quality cover image</li>
              <li>Proofread before publishing</li>
            </ul>

          </div>

        </div>
      </div>
    </>
  )
}

export default CreateArticleMid