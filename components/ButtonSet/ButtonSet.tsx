"use client";

import React from 'react'
import styles from "./ButtonSet.module.scss"
import { IButtonSet } from '@/constants/interfaces'
import SVG from '../SVG/SVG';

const ButtonSet = ({
    primaryText,
    primaryDisabledText,
    secondaryText,
    onPrimaryClick,
    onSecondaryClick,
    showPrimary = true,
    showSecondary = true,
    disablePrimary = false,
    disableSecondary = false,
    primarySVG = "",
    secondarySVG = "",
    SVGPosition = "left"
}: IButtonSet) => {

    return (
        <div className={styles['buttonset-container']}>
            {
                showPrimary &&
                primaryText &&
                <button
                    disabled={disablePrimary}
                    onClick={onPrimaryClick}
                    title={disablePrimary ? (primaryDisabledText || primaryText) : primaryText}
                    aria-label={primaryText}
                    className={disablePrimary ? styles['button-primary-disabled'] : styles['button-primary']}
                >
                    {SVGPosition === "left" && primarySVG && <SVG height={16} width={16} color='var(--text)' type={primarySVG} />}
                    {primaryText}
                    {SVGPosition === "right" && primarySVG && <SVG height={16} width={16} color='var(--text)' type={primarySVG} />}
                </button>
            }

            {
                showSecondary &&
                secondaryText &&
                <button
                    disabled={disableSecondary}
                    onClick={onSecondaryClick}
                    title={secondaryText}
                    aria-label={secondaryText}
                    className={disableSecondary ? styles['button-secondary-disabled'] : styles['button-secondary']}
                >
                    {SVGPosition === "left" && secondarySVG && <SVG height={16} width={16} color='var(--text)' type={secondarySVG} />}
                    {secondaryText}
                    {SVGPosition === "right" && secondarySVG && <SVG height={16} width={16} color='var(--text)' type={secondarySVG} />}
                </button>
            }
        </div>
    )
}

export default ButtonSet