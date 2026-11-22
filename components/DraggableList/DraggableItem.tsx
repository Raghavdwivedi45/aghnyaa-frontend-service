import { IReference } from '@/constants/article.interfaces';
import styles from './VerticalDraggable.module.scss';
import Link from 'next/link';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import SVG from '../SVG/SVG';

const DraggableItem = ({ reference, index }: { reference: IReference; index: number }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: index });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      key={index}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles['draggables']}
    >
      <span>{index + 1 + ')'}</span> &nbsp;
      {reference.type === 'text' && <span>{reference.description}</span>}
      {reference.type === 'link' && (
        <Link href={reference.description} target="_blank">
          {reference.description}
        </Link>
      )}
      <span className={styles['draggable-icon']}>
        <SVG type="drag" color="var(--text)" />
      </span>
    </div>
  );
};

export default DraggableItem;
