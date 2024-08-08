'use client';
import CardGenre from '@/components/Atoms/CardGenre/CardGenre';
import MoviesList from '@/components/Molecules/MoviesList/MoviesList';
import SeriesList from '@/components/Molecules/SeriesList/SeriesList';
import { movieGenresAtom } from '@/states/MovieGenresAtom';
import { serieGenresAtom } from '@/states/SerieGenresAtom';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

function HomeContent() {
    const [genres] = useAtom(movieGenresAtom);
    const [serieGenres] = useAtom(serieGenresAtom);
    const [nCards, setNCards] = useState(5)

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth;
            if (width > 1635) {
                setNCards(5);
            } else if (width > 1365) {
                setNCards(4);
            } else if (width > 970) {
                setNCards(3);
            } else if (width > 520) {
                setNCards(2);
            } else {
                setNCards(1);
            }
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    return (
        <div className='px-96 lg_1:px-40 lg_4:px-20 md_3:px-5 py-5 space-y-14'>
            <div className='space-y-3'>
                <h1 className='font-bold text-4xl sm_1:text-center'>Movies</h1>
                {Array.isArray(genres) && genres.length > 0 && (
                    <div className='flex justify-between sm_1:justify-center items-center'>
                        {genres
                            .sort(() => Math.random() - 0.5)
                            .slice(0, nCards)
                            .map((genre, index) => (
                                <CardGenre key={index} genre={genre} />
                            ))}
                    </div>
                )}
            </div>
            <MoviesList />
            <div className='space-y-3'>
                <h1 className='font-bold text-4xl sm_1:text-center'>Series</h1>
                {Array.isArray(serieGenres) && serieGenres.length > 0 && (
                    <div className='flex justify-between sm_1:justify-center items-center'>
                        {serieGenres
                            .sort(() => Math.random() - 0.5)
                            .slice(0, nCards)
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
