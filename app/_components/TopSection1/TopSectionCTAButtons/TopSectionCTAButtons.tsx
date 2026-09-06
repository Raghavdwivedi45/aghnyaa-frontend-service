"use client";

import ButtonSet from '@/components/ButtonSet/ButtonSet'
import { useRouter } from 'next/navigation'
import React from 'react'

const TopSectionCTAButtons = () => {
    const router = useRouter();

    const redirectOnPrimaryClick = () => {
        router.push("/articles")
    }

    const redirectOnSecondaryClick = () => {
        router.push("/cases")
    }

    return (
        <ButtonSet
            primaryText='Start Reading'
            secondaryText='Explore Cases'
            onPrimaryClick={redirectOnPrimaryClick}
            onSecondaryClick={redirectOnSecondaryClick} 
        />
    )
}

export default TopSectionCTAButtons;