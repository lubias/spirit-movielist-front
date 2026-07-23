'use client'
import GenreList from '@/templates/GenreList/GenreList'
import { useParams } from 'next/navigation';
import React from 'react'

function page() {
    const { type, id } = useParams();
    const validType = type === 'tv' ? 'tv' : 'movie';

    return (
        <GenreList type={validType} id={id} />
    )
}

export default page
