'use client';
import CardGenre from '@/components/Atoms/CardGenre/CardGenre';
import MoviesList from '@/components/Molecules/MoviesList/MoviesList';
import SeriesList from '@/components/Molecules/SeriesList/SeriesList';
import { movieGenresAtom } from '@/states/MovieGenresAtom';
import { serieGenresAtom } from '@/states/SerieGenresAtom';
import { useAtom } from 'jotai';
import React from 'react';

function HomeContent() {
    const [genres] = useAtom(movieGenresAtom);
    const [serieGenres] = useAtom(serieGenresAtom);

    return (
        <div className='px-96 py-5 space-y-14'>
            <div className='space-y-3'>
                <h1 className='font-bold text-4xl'>Movies</h1>
                {Array.isArray(genres) && genres.length > 0 && (
                    <div className='flex justify-between items-center'>
                        {genres
                            .sort(() => Math.random() - 0.6)
                            .slice(0, 6)
                            .map((genre, index) => (
                                <CardGenre key={index} genre={genre} />
                            ))}
                    </div>
                )}
            </div>
            <MoviesList />
            <div className='space-y-3'>
                <h1 className='font-bold text-4xl'>Series</h1>
                {Array.isArray(serieGenres) && serieGenres.length > 0 && (
                    <div className='flex justify-between items-center'>
                        {serieGenres
                            .sort(() => Math.random() - 0.6)
                            .slice(0, 6)
                            .map((genre, index) => (
                                <CardGenre key={index} genre={genre} />
                            ))}
                    </div>
                )}
            </div>
            <SeriesList />
        </div>
    );
}

export default HomeContent;
