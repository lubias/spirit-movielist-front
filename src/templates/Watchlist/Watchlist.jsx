'use client';
import React, { useEffect } from 'react'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { watchlistAtom } from '@/states/WatchlistAtom'
import { configurationAtom } from '@/states/ConfigurationAtom'
import { ConfigurationService } from '@/api/ConfigurationService'
import Header from '@/components/Organisms/Header/Header'
import Footer from '@/components/Organisms/Footer/Footer'
import CardMovie from '@/components/Atoms/CardMovie/CardMovie'
import CardSerie from '@/components/Atoms/CardSerie/CardSerie'

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

function Watchlist() {
    const [watchlist, setWatchlist] = useAtom(watchlistAtom);
    const [configuration, setConfiguration] = useAtom(configurationAtom);

    useEffect(() => {
        if (isEmptyObject(configuration)) {
            ConfigurationService.get()
                .then(response => setConfiguration(response.images))
                .catch(error => console.error("Erro ao realizar a busca.", error));
        }
    }, [configuration]);

    const removeItem = (item) => {
        setWatchlist(watchlist.filter(entry => !(entry.id === item.id && entry.type === item.type)));
    };

    return (
        <div className='bg-black-08 space-y-20 min-h-screen'>
            <Header />
            <div className='px-96 lg_1:px-40 lg_4:px-20 md_3:px-5 space-y-8 min-h-[45vh]'>
                <h1 className='font-bold text-4xl sm_1:text-center'>
                    Minha lista<span className='text-green-45'>.</span>
                </h1>

                {watchlist.length === 0 ? (
                    <div className='flex flex-col items-center gap-4 py-20 text-center'>
                        <p className='text-white/50'>Sua lista está vazia.</p>
                        <Link
                            href='/'
                            className='bg-green-45 text-black-06 font-bold text-sm rounded-lg px-6 py-3 hover:shadow-custom transition'
                        >
                            Explorar filmes e séries
                        </Link>
                    </div>
                ) : (
                    <div className='flex flex-wrap gap-6 justify-center'>
                        {watchlist.map(item => (
                            <div key={`${item.type}-${item.id}`} className='relative'>
                                {item.type === 'tv'
                                    ? <CardSerie serie={{ ...item, name: item.title }} configuration={configuration} />
                                    : <CardMovie movie={item} configuration={configuration} />}
                                <button
                                    onClick={() => removeItem(item)}
                                    aria-label='Remover da lista'
                                    className='absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black-06/90 border border-black-20 flex items-center justify-center hover:border-red-45 hover:text-red-500 transition'
                                >
                                    <svg viewBox='0 0 24 24' width='14' height='14' fill='none' stroke='currentColor' strokeWidth='2.5'>
                                        <path d='M18 6 6 18M6 6l12 12' />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    )
}

export default Watchlist
