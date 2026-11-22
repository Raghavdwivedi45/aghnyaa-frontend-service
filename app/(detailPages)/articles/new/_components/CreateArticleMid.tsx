'use client';

import React, { useContext, useEffect, useState } from 'react';
import styles from './component.module.scss';
import Input from '@/components/Input/Input';
import FileInput from '@/components/Input/FileInput';
import Tiptap from '@/components/Tiptap/Tiptap';
import Dropdown from '@/components/Dropdown/Dropdown';
import { articleTags, articleTips, publishingOptions } from '@/constants/article.constants'; //  articleCategory
import RadioGroup from '@/components/RadioGroup/RadioGroup';
import Toggle from '@/components/Toggle/Toggle';
import SVG from '@/components/SVG/SVG';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';
import { newArticleBreadcrumbs } from '@/constants/constants';
import PublishButton from './PublishButton';
import { IArticleForm1, IReference } from '@/constants/article.interfaces';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/contexts/AuthContext';
import { isEligibleForDraft, isReferenceArray } from '@/utils/helperFunctions';
import { ToasterContext } from '@/contexts/ToasterContext';
import LinkRelatedArticles from './LinkRelatedArticles';

const CreateArticleMid = ({ parentPayload }: { parentPayload: IArticleForm1 }) => {
  const [payload, setPayload] = useState<IArticleForm1>(parentPayload);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const router = useRouter();
  const { user, isPending: isAuthPending } = useContext(AuthContext);
  const { setSuccessList } = useContext(ToasterContext);

  const resetLocalStorage = () => {
    localStorage.removeItem('article-draft');
    setPayload(parentPayload);
  };

  useEffect(() => {
    if (!isAuthPending && user?.role !== 'AUTHOR') {
      router.push('/articles');
    }
  }, [isAuthPending, router, user?.role]);

  useEffect(() => {
    const savedDraft = localStorage.getItem('article-draft');

    if (savedDraft) {
      const parsedDraft = JSON.parse(savedDraft);
      if (payload.slug !== parsedDraft?.slug) return;

      // Restore draft from localStorage after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPayload(parsedDraft);
      setSuccessList('Showing your unsaved changes. You can continue editing or discard changes.');
    }
  }, [payload.slug, setSuccessList]);

  useEffect(() => {
    /*
      This useEffect implements auto-saving every 30 seconds.
      1. useEffect runs when the component mounts or whenever payload changes.
      2. setInterval() starts a timer that executes every 30_000 milliseconds (30 seconds).
      3. Every 30 seconds (if conditions are met):
        - JSON.stringify(payload) converts the article data into a JSON string.
        - localStorage.setItem() saves it under the key 'article-draft'.
      4. return () => clearInterval(interval) clears the previous timer when the effect reruns or the component unmounts. 
    */
    const saveDraft = () => {
      if (isEligibleForDraft(payload, parentPayload)) {
        localStorage.setItem('article-draft', JSON.stringify(payload));
      }
    };
    const interval = setInterval(saveDraft, 30_000); // Auto-save every 30 seconds
    window.addEventListener('beforeunload', saveDraft); // Save before page unload

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', saveDraft);
    };
  }, [parentPayload, payload]);

  const updatePayload = (
    key: keyof IArticleForm1,
    value: string | number | string[] | IReference[] = '',
  ) => {
    if (key === 'isFeatured') {
      setPayload((prev) => ({ ...prev, isFeatured: !prev.isFeatured }));
      return;
    }

    if (key === 'references') {
      if (!isReferenceArray(value)) {
        return console.log('Article references must be an array of references.');
      }
      setPayload((prev) => ({ ...prev, references: [...value] }));
      return;
    } else if (key === 'tags') {
      if (!Array.isArray(value) || !value.every((tag): tag is string => typeof tag === 'string'))
        return;
      setPayload((prev) => ({ ...prev, tags: [...value] }));
      return;
    }

    setPayload((prev) => ({ ...prev, [key]: value }));
  };

  const addTag = (tag: string) => {
    const cleaned = tag?.trim();
    if (!cleaned || payload.tags.includes(cleaned)) return;
    updatePayload('tags', [...payload.tags, cleaned]);
  };

  const removeTag = (tag: string) => {
    updatePayload(
      'tags',
      payload.tags.filter((el) => el !== tag),
    );
  };

  const updateFile = (file: File | null) => {
    // payload's field "coverIImage" will be handled mainly in the PublishButton component,
    // swe just need to store the file here and temporarily change the field so that getChangedFields can detect a change in the payload and enable the publish button inside <PublishButton/>.
    updatePayload('coverImage', file?.name || '');
    setCoverImageFile(file);
  };

  if (isAuthPending || user?.role !== 'AUTHOR') return null;

  return (
    <>
      <div className={styles['new-article-top']}>
        <div>
          <BreadCrumbs breadcrumbArray={newArticleBreadcrumbs} />
          <h2>Create New Article</h2>
          <h5>Share your knowledge with the world</h5>
        </div>

        <div>
          <PublishButton
            articlePayload={payload}
            originalPayload={parentPayload}
            coverImageFile={coverImageFile}
            resetLocalStorage={resetLocalStorage}
          />
        </div>
      </div>
      <div className={styles['new-article-mid']}>
        <div className={styles['new-article-mid-left']}>
          <Input
            value={payload?.title}
            onInputChange={(value) => updatePayload('title', value?.toString())}
            placeholder="Enter a compelling title for your article"
            title="Title"
            necessaryInput={true}
            maxCharCount={150}
          />
          <Input
            value={payload?.excerpt}
            isTextArea={true}
            textAreaProperties={{ resize: false, rows: 3, columns: null }}
            onInputChange={(value) => updatePayload('excerpt', value?.toString())}
            placeholder="Write a short summary for your article"
            title="Excerpt"
            necessaryInput={true}
            maxCharCount={250}
          />
          <FileInput
            onFileUpload={(file: File | null) => updateFile(file)}
            presetFilename={payload?.coverImage}
          />

          <Tiptap
            content={payload?.content}
            references={payload?.references}
            updateContent={(content) => updatePayload('content', content)}
            updateReference={(references) => updatePayload('references', references)}
          />
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

          {/* <Dropdown placeholder='Category' selectedValue={payload?.category} dropdownList={articleCategory} onOptionSelect={(value) => updatePayload("category", value?.toString())} /> */}
        </div>
        <div className={styles['new-article-mid-right']}>
          <h4>Publishing Options</h4>

          <span className={styles['right-title']}>Status</span>
          <RadioGroup
            name="status"
            value={payload.status}
            options={publishingOptions}
            onChange={(value) => updatePayload('status', value)}
          />
          <hr className={styles['right-divider']} />

          <Toggle
            label="Featured Article"
            isToggledOn={payload?.isFeatured}
            onToggleUpdate={() => updatePayload('isFeatured')}
            description="Want to mark this article as featured ?"
          />
          <hr className={styles['right-divider']} />

          <Input
            value={payload?.readTime}
            onInputChange={(value) => updatePayload('readTime', value)}
            inputType="number"
            placeholder="Enter a compelling title for your article"
            title="Estimated Reading time (in minutes)"
            necessaryInput={true}
          />
          <hr className={styles['right-divider']} />

          <LinkRelatedArticles handleModalSubmit={(val) => updatePayload('linkedArticles', val)} />

          <div className={styles['writing-tips-container']}>
            <h4 className={styles['writing-tips-head']}>
              <SVG type="bulb" />
              Writing Tips
            </h4>
            <ul className={styles['writing-tips-list']}>
              {articleTips.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateArticleMid;
