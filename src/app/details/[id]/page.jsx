'use client'
import MovieDetails from '@/templates/MovieDetails/MovieDetails'
import { useParams, useSearchParams } from 'next/navigation';
import React from 'react'

function page() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const type = searchParams.get('type') === 'tv' ? 'tv' : 'movie';

    return (
        <MovieDetails id={id} type={type} />
    )
}

export default page
