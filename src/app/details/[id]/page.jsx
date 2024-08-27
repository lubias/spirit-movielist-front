'use client'
import MovieDetails from '@/templates/MovieDetails/MovieDetails'
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react'

function page() {
    const { id } = useParams();

    return (
        <MovieDetails id={id} />
    )
}

export default page