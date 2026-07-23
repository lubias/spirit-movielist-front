'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { listsMoviesServices } from '@/api/ListsMoviesService'

function Footer() {
    const [genres, setGenres] = useState([]);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        listsMoviesServices.getGenres()
            .then(response => setGenres(response.genres?.slice(0, 5) ?? []))
            .catch(error => console.error("Erro ao buscar gêneros.", error));
    }, []);

    return (
        <div className='px-40 lg_1:px-24 sm_1:px-5 md_2:px-10 pt-20 pb-12 bg-black-06'>
            <div className='flex justify-between gap-10 mb-16 md_1:grid md_1:grid-cols-2'>
                <div className='flex flex-col gap-3 max-w-sm'>
                    <p className='font-bold text-xl'>
                        <span className='italic'>Spirit</span>{' '}
                        <span className='text-white/60 font-normal'>movie list</span>
                    </p>
                    <p className='text-sm text-white/50'>
                        Descubra filmes e séries populares, explore por gênero e veja onde assistir — tudo em um só lugar, com dados da TMDB.
                    </p>
                </div>
                <div className='flex flex-col'>
                    <p className='mb-5 font-semibold'>Navegar</p>
                    <div className='flex flex-col gap-1'>
                        <Link href='/'>Início</Link>
                        <Link href='/#movies'>Filmes</Link>
                        <Link href='/#series'>Séries</Link>
                    </div>
                </div>
                {genres.length > 0 && (
                    <div className='flex flex-col'>
                        <p className='mb-5 font-semibold'>Gêneros em destaque</p>
                        <div className='flex flex-col gap-1'>
                            {genres.map(genre => (
                                <Link key={genre.id} href={`/genre/movie/${genre.id}`}>
                                    {genre.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <div className='w-full h-[1px] bg-slate-300 opacity-35' />
            <p className='text-sm text-center mt-5'>
                © {currentYear} Spirit - Movie List. Todos os direitos reservados.
            </p>
        </div>
    )
}

export default Footer
