import React, { ReactNode } from 'react';
import styles from './Modal.module.scss';
import SVG from '../SVG/SVG';

interface IModal {
  closeModal: () => void;
  heading: string;
  content: ReactNode;
  footer?: ReactNode;
}

const Modal = ({ closeModal, heading, content, footer }: IModal) => {
  const closeIt = () => {
    closeModal();
  };
  return (
    <div className={styles['modal-page']}>
      <div className={styles['modal-container']}>
        <div className={styles['modal-head']}>
          <div>{heading}</div>
          <div className={styles['modal-cross']} onClick={closeIt}>
            <SVG type="cross" height={16} width={16} />
          </div>
        </div>
        <div className={styles['modal-content']}>{content}</div>
        <div className={styles['modal-footer']}>{footer}</div>
      </div>
    </div>
  );
};

export default Modal;
