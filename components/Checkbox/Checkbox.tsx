import React from 'react';
import styles from './Checkbox.module.scss';
import SVG from '../SVG/SVG';

interface CheckboxProps {
  checked: boolean;
  id: string | number;
  onCheck: (_id: string | number) => void;
}

const Checkbox = ({ checked, id, onCheck }: CheckboxProps) => {
  const onCheckBoxClick = () => {
    onCheck(id);
  };

  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={(e) => {
        e.stopPropagation();
        onCheckBoxClick();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCheckBoxClick();
        }
      }}
      className={checked ? styles['checkbox-checked'] : styles.checkbox}
    >
      {checked && <SVG type="tick" width={16} height={16} color="var(--text)" />}
    </div>
  );
};

export default Checkbox;
