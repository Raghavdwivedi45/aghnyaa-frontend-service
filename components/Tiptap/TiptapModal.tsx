import React, { useState } from 'react';
import styles from './Tiptap.module.scss';
import Modal from '../Modal/Modal';
import Input from '../Input/Input';
import ButtonSet from '../ButtonSet/ButtonSet';
import Dropdown from '@/components/Dropdown/Dropdown';
import { IReference } from '@/constants/article.interfaces';
import { tiptapModalType } from '@/constants/types';

const referenceTypeOptions = [
  { key: 'text', text: 'Text' },
  { key: 'link', text: 'Link' },
];

const TiptapModal = ({
  modalType,
  closeModal,
  modalSubmit,
}: {
  modalType: tiptapModalType;
  closeModal: () => void;
  modalSubmit: (type: tiptapModalType, references: IReference, url: string) => void;
}) => {
  const [urlValue, setUrlValue] = useState('');
  const [currentReferenceValue, setCurrentReferenceValue] = useState({
    type: 'Text',
    description: '',
  });

  const modalContent = () => {
    switch (modalType) {
      case 'youtube-video':
      case 'image':
      case 'link':
        return (
          <Input
            placeholder="Enter Link URL"
            value={urlValue}
            onInputChange={(value) => setUrlValue(value.toString())}
          />
        );

      case 'references':
        return (
          <div className={styles['input-group']}>
            <Dropdown
              placeholder="Reference Type"
              dropdownList={referenceTypeOptions}
              selectedValue={currentReferenceValue.type}
              onOptionSelect={(value) =>
                setCurrentReferenceValue((reference) => ({
                  ...reference,
                  type: value.toString(),
                }))
              }
            />
            <Input
              placeholder="Description"
              value={currentReferenceValue.description}
              onInputChange={(value) =>
                setCurrentReferenceValue({
                  ...currentReferenceValue,
                  description: value?.toString(),
                })
              }
            />
          </div>
        );
    }
  };

  const handleModalSubmit = () => {
    modalSubmit(modalType, currentReferenceValue, urlValue);
    closeModal();
  };

  const modalPlaceholder = {
    image: 'Enter Image URL',
    link: 'Enter Link URL',
    references: 'Enter Reference Details',
    'youtube-video': 'Enter YouTube URL',
  }[modalType ?? 'references'];

  return (
    <Modal
      closeModal={closeModal}
      heading={modalPlaceholder}
      content={modalContent()}
      footer={
        <div className={styles['modal-footer']}>
          <ButtonSet primaryText="Submit" onPrimaryClick={handleModalSubmit} />
        </div>
      }
    />
  );
};

export default TiptapModal;
