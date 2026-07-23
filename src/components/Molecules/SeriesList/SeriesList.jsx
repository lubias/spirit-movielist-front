'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { configurationAtom } from '@/states/ConfigurationAtom';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { serieGenresAtom } from '@/states/SerieGenresAtom';
import CardSerie from '@/components/Atoms/CardSerie/CardSerie';
import { listsSeriesService } from '@/api/ListSeriesService';

function SeriesList() {
    const [seriesByGenre, setSeriesByGenre] = useState({});
    const [configuration] = useAtom(configurationAtom);
    const [genres] = useAtom(serieGenresAtom);
    const [nCards, setNCards] = useState(6);

    const selectedGenres = useMemo(
        () => Array.isArray(genres) ? [...genres].sort(() => Math.random() - 0.5).slice(0, 3) : [],
        [genres]
    );

    const handleGetList = async (genre) => {
        try {
            const response = await listsSeriesService.getByGenre(genre.id);
            setSeriesByGenre(prevState => ({
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
                                            <Link href={`/genre/tv/${genre.id}`}>Ver mais</Link>
                                            <img src='/icons/arrowRight.svg' className='h-4' />
                                        </div>
                                    </div>
                                    {seriesByGenre[genre.id] && (
                                        <div className='flex justify-between sm_1:justify-center sm_2:flex-col items-center'>
                                            {seriesByGenre[genre.id].slice(0, nCards).map((serie, index) => (
                                                <CardSerie key={index} serie={serie} configuration={configuration} />
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

export default SeriesList