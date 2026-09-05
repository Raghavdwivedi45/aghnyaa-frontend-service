
"use client";

import React, { ReactNode, useEffect, useRef, useState } from 'react';
import styles from "./Accordion.module.scss";
import SVG from '../SVG/SVG';
import { SVGType } from '@/constants/types';

const Accordion = ({ children, heading = "", additionalIcon }: { children: ReactNode, heading: string, additionalIcon?: SVGType }) => {
  const [height, setHeight] = useState<number>(0);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });
    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  const toggleOpenedState = () => {
    setIsOpened(prev => !prev);
  }

  return (
    <div className={styles['accordion-container']}>

      <div className={styles['accordion-heading-div']} onClick={toggleOpenedState}>

        <div title={heading} className={styles['accordion-heading']}>
          {additionalIcon && <span><SVG color='var(--border-subtle)' type={additionalIcon} /></span>}
          <h3>{heading}</h3>
        </div>

        <div>
          <SVG color='var(--border-subtle)' type={isOpened ? "chevron-up" : 'chevron-down'} />
        </div>
      </div>

      {/* Only the content collapses */}
      <div style={{ height: isOpened ? `${height}px` : "0px" }} className={`${styles['accordion-content']} ${isOpened ? styles['opened'] : ''}`}>
        <div ref={contentRef} className={styles['accordion-content-inner']}>
          {children}
        </div>
      </div>

    </div>
  )
}

export default Accordion
