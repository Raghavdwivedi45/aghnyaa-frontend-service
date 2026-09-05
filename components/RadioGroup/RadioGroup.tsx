import { RadioGroupProps } from '@/constants/types';
import React from 'react'
import styles from "./RadioGroup.module.scss";
import SVG from '../SVG/SVG';

const RadioGroup = ({
    name,
    options,
    value,
    onChange,
}: RadioGroupProps) => {
    return (
        <div className={styles['input-container']} >
            {options.map(option => (
                <label className={value === option.value ? styles['input-each-active'] : styles['input-each']} key={option.value}>
                    <div>
                        {option?.svg && (<SVG type={option.svg} color='var(--button-primary-text)' height={12} width={12} />)}

                        <input
                            className={option?.svg ? styles['input-radio-hide'] : styles['input-radio']}
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                        />
                    </div>
                    <div>
                        {option.label}
                    </div>
                </label>
            ))}
        </div>
    );
}

export default RadioGroup