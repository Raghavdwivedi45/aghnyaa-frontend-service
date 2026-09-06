"use client";

import ButtonSet from '@/components/ButtonSet/ButtonSet';
import { AuthContext } from '@/contexts/AuthContext';
import Link from 'next/link';
import React, { useContext } from 'react'

const CreateNewButton = ({ type }: { type: "Article" | "Book" }) => {
    const { user } = useContext(AuthContext)
    return (
        <Link href={type === "Article" ? "/articles/new" : "/books/new"}>
            <ButtonSet primaryText={`Add New ${type}`} disablePrimary={user?.role !== "AUTHOR"} primaryDisabledText="Login as author to continue" />
        </Link>
    )
}

export default CreateNewButton