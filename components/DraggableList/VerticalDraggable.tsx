import { IReference } from '@/constants/article.interfaces';
import styles from './VerticalDraggable.module.scss';
import React from 'react';
import DraggableItem from './DraggableItem';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { DndContext, DragEndEvent, closestCorners } from '@dnd-kit/core';

const VerticalDraggable = ({
  referenceArray,
  setReferenceArray,
}: {
  referenceArray: IReference[];
  setReferenceArray: (newArray: IReference[]) => void;
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const newArray = [...referenceArray];
    [newArray[active.id as number], newArray[over.id as number]] = [
      newArray[over.id as number],
      newArray[active.id as number],
    ];
    setReferenceArray(newArray);
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className={styles['vertical-draggable']}>
        <SortableContext
          items={referenceArray.map((_, index) => index)}
          strategy={verticalListSortingStrategy}
        >
          {referenceArray.map((reference, index) => (
            <DraggableItem reference={reference} index={index} key={index} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default VerticalDraggable;
