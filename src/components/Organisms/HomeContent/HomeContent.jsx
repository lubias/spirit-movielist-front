'use client';
import CardGenre from '@/components/Atoms/CardGenre/CardGenre';
import MoviesList from '@/components/Molecules/MoviesList/MoviesList';
import SeriesList from '@/components/Molecules/SeriesList/SeriesList';
import { movieGenresAtom } from '@/states/MovieGenresAtom';
import { serieGenresAtom } from '@/states/SerieGenresAtom';
import { useAtom } from 'jotai';
import React, { useEffect, useMemo, useState } from 'react';

function HomeContent() {
    const [genres] = useAtom(movieGenresAtom);
    const [serieGenres] = useAtom(serieGenresAtom);
    const [nCards, setNCards] = useState(5)

    const shuffledGenres = useMemo(
        () => Array.isArray(genres) ? [...genres].sort(() => Math.random() - 0.5) : [],
        [genres]
    );
    const shuffledSerieGenres = useMemo(
        () => Array.isArray(serieGenres) ? [...serieGenres].sort(() => Math.random() - 0.5) : [],
        [serieGenres]
    );

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
            <div id='movies' className='space-y-3'>
                <h1 className='font-bold text-4xl sm_1:text-center'>Filmes</h1>
                {shuffledGenres.length > 0 && (
                    <div className='flex justify-between sm_1:justify-center items-center'>
                        {shuffledGenres
                            .slice(0, nCards)
                            .map((genre, index) => (
                                <CardGenre key={index} genre={genre} type="movie" />
                            ))}
                    </div>
                )}
            </div>
            <MoviesList />
            <div id='series' className='space-y-3'>
                <h1 className='font-bold text-4xl sm_1:text-center'>Séries</h1>
                {shuffledSerieGenres.length > 0 && (
                    <div className='flex justify-between sm_1:justify-center items-center'>
                        {shuffledSerieGenres
                            .slice(0, nCards)
                            .map((genre, index) => (
                                <CardGenre key={index} genre={genre} type="tv" />
                            ))}
                    </div>
                )}
            </div>
            <SeriesList />
        </div>
    );
}

export default HomeContent;
