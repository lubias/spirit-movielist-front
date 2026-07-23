'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { listsMoviesServices } from '@/api/ListsMoviesService';
import CardMovie from '@/components/Atoms/CardMovie/CardMovie';
import { configurationAtom } from '@/states/ConfigurationAtom';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { movieGenresAtom } from '@/states/MovieGenresAtom';

function MoviesList() {
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const [configuration] = useAtom(configurationAtom);
    const [genres] = useAtom(movieGenresAtom);
    const [nCards, setNCards] = useState(6);

    const selectedGenres = useMemo(
        () => Array.isArray(genres) ? [...genres].sort(() => Math.random() - 0.5).slice(0, 3) : [],
        [genres]
    );

    const handleGetList = async (genre) => {
        try {
            const response = await listsMoviesServices.getByGenre(genre.id);
            setMoviesByGenre(prevState => ({
                ...prevState,
                [genre.id]: response.results
            }));
        } catch (error) {
            console.error("Erro ao obter a lista:", error);
        }
    };

    useEffect(() => {
        selectedGenres.forEach(genre => {
            handleGetList(genre);
        });
    }, [selectedGenres]);

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
        <div>
            {
                selectedGenres.length > 0 && (
                    <div className='space-y-14'>
                        {selectedGenres
                            .map((genre) => (
                                <div key={genre.id} className='space-y-3'>
                                    <div className='flex justify-between sm_1:justify-around items-center'>
                                        <h2 className='font-semibold text-2xl'>
                                            {genre.name}<span className='text-green-45 font-semibold'>.</span>
                                        </h2>
                                        <div className='flex items-center gap-1'>
                                            <Link href={`/genre/movie/${genre.id}`}>Ver mais</Link>
                                            <img src='/icons/arrowRight.svg' className='h-4' />
                                        </div>
                                    </div>
                                    {moviesByGenre[genre.id] && (
                                        <div className='flex justify-between sm_1:justify-center items-center'>
                                            {moviesByGenre[genre.id].slice(0, nCards).map((movie, index) => (
                                                <CardMovie key={index} movie={movie} configuration={configuration} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                )
            }
        </div>
    )
}

export default MoviesList