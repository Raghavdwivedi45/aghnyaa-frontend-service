import React from 'react';
import styles from "./SVGWithText.module.scss";
import SVG from '../SVG/SVG';
import { ISVGTagsStyle, ISVGWithText } from '@/constants/interfaces';
import Image from 'next/image';
import { tagColors } from '@/constants/constants';

const SVGWithText = ({ type, src, value, height = 16, width = 16, color = "currentColor", withDesign = false, index, direction = "left" }: ISVGWithText) => {

    const idx = index ? Math.floor(index % tagColors.length) : 0;

    const tagStyle: ISVGTagsStyle = {
        backgroundColor: tagColors[idx].background,
        color: tagColors[idx].color,
        borderRadius: (type || src) ? "8px" : "16px",
        padding: (type || src) ? "4px" : "4px 8px"
    }

    return (
        <p style={withDesign ? tagStyle : {}} className={styles.SVGTextcontainer}>
            {
                direction === "left" &&
                (type || src) &&
                <span className={`${styles.SVGIcon} ${src ? styles.circularImage : ""}`}>
                    {type && <SVG type={type} height={height} width={width} color={color} />}
                    {src && <Image src={src} height={height} width={width} alt={value?.toString()} />}
                </span>
            }
            <span title={value?.toString()} className={styles.text}>
                {value}
            </span>
            {
                direction === "right" &&
                (type || src) &&
                <span className={`${styles.SVGIcon} ${src ? styles.circularImage : ""}`}>
                    {type && <SVG type={type} height={height} width={width} color={color} />}
                    {src && <Image src={src} height={height} width={width} alt={value?.toString()} />}
                </span>
            }
        </p>
    )
}

export default SVGWithText