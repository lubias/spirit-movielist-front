'use client';
import React, { useEffect, useState } from 'react'
import { useAtom } from 'jotai';
import { configurationAtom } from '@/states/ConfigurationAtom';
import { ConfigurationService } from '@/api/ConfigurationService';
import { listsMoviesServices } from '@/api/ListsMoviesService';
import { listsSeriesService } from '@/api/ListSeriesService';
import Header from '@/components/Organisms/Header/Header';
import Footer from '@/components/Organisms/Footer/Footer';
import CardMovie from '@/components/Atoms/CardMovie/CardMovie';
import CardSerie from '@/components/Atoms/CardSerie/CardSerie';

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

function GenreList({ type, id }) {
    const [configuration, setConfiguration] = useAtom(configurationAtom);
    const [genreName, setGenreName] = useState('');
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const service = type === 'tv' ? listsSeriesService : listsMoviesServices;

    useEffect(() => {
        if (isEmptyObject(configuration)) {
            ConfigurationService.get()
                .then(response => setConfiguration(response.images))
                .catch(error => console.error("Erro ao realizar a busca.", error));
        }
    }, [configuration]);

    useEffect(() => {
        service.getGenres()
            .then(response => {
                const match = response.genres?.find(genre => String(genre.id) === String(id));
                setGenreName(match?.name ?? '');
            })
            .catch(error => console.error("Erro ao buscar gêneros.", error));
    }, [type, id]);

    useEffect(() => {
        setItems([]);
        setPage(1);
        setTotalPages(1);
    }, [type, id]);

    useEffect(() => {
        setLoading(true);
        service.getByGenre(id, page)
            .then(response => {
                setItems(prev => page === 1 ? (response.results ?? []) : [...prev, ...(response.results ?? [])]);
                setTotalPages(Math.min(response.total_pages ?? 1, 500));
            })
            .catch(error => console.error("Erro ao buscar a lista.", error))
            .finally(() => setLoading(false));
    }, [type, id, page]);

    return (
        <div className='bg-black-08 space-y-20 min-h-screen'>
            <Header />
            <div className='px-96 lg_1:px-40 lg_4:px-20 md_3:px-5 space-y-8'>
                <div>
                    <p className='text-green-45 text-sm font-bold uppercase tracking-wide mb-1'>
                        {type === 'tv' ? 'Séries' : 'Filmes'}
                    </p>
                    <h1 className='font-bold text-4xl sm_1:text-center'>
                        {genreName || '...'}<span className='text-green-45'>.</span>
                    </h1>
                </div>

                <div className='flex flex-wrap gap-6 justify-center'>
                    {items.map(item => (
                        type === 'tv'
                            ? <CardSerie key={item.id} serie={item} configuration={configuration} />
                            : <CardMovie key={item.id} movie={item} configuration={configuration} />
                    ))}
                </div>

                {page < totalPages && (
                    <div className='flex justify-center pb-10'>
                        <button
                            onClick={() => setPage(prev => prev + 1)}
                            disabled={loading}
                            className='bg-green-45 text-black-06 font-bold text-sm rounded-lg px-6 py-3 disabled:opacity-50 hover:shadow-custom transition'
                        >
                            {loading ? 'Carregando...' : 'Carregar mais'}
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default GenreList
