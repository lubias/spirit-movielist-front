'use client';
import React from 'react';
import { useAtom } from 'jotai';
import { watchlistAtom } from '@/states/WatchlistAtom';

function HeroMovieDetails({ image, configuration, details, type = 'movie', trailer }) {
    const [watchlist, setWatchlist] = useAtom(watchlistAtom);
    const title = details?.title ?? details?.name;
    const releaseDate = details?.release_date ?? details?.first_air_date;
    const score = details?.vote_average;
    const duration = type === 'movie'
        ? (details?.runtime ? `${details.runtime} min` : null)
        : (details?.number_of_seasons
            ? `${details.number_of_seasons} temporada${details.number_of_seasons > 1 ? 's' : ''}`
            : null);

    const isSaved = details ? watchlist.some(item => item.id === details.id && item.type === type) : false;

    const toggleWatchlist = () => {
        if (isSaved) {
            setWatchlist(watchlist.filter(item => !(item.id === details.id && item.type === type)));
        } else {
            setWatchlist([...watchlist, { id: details.id, type, title, poster_path: details.poster_path }]);
        }
    };

    return (
        <div
            className='w-full h-full !overflow-hidden relative flex gap-10 px-40 py-10'
        >
            <img
                src={`${configuration.base_url}${configuration.poster_sizes[3]}${image}`}
                className='w-72 rounded-lg'
            />
            <div className='flex flex-col justify-between'>
                {details && (
                    <>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-4'>
                                <h1 className='font-bold text-4xl sm_1:text-center'>
                                    {title} {releaseDate ? `(${releaseDate.split('-')[0]})` : ''}
                                </h1>
                                {typeof score === 'number' && score > 0 && (
                                    <div
                                        className='relative w-14 h-14 rounded-full grid place-items-center flex-none'
                                        style={{ background: `conic-gradient(#C9A24B ${score * 10}%, rgba(255,255,255,.12) 0)` }}
                                    >
                                        <div className='absolute inset-1 rounded-full bg-black-08' />
                                        <span className='relative font-extrabold text-sm text-center leading-tight'>
                                            {score.toFixed(1)}
                                            <em className='block text-[9px] font-normal text-white/40 not-italic'>/10</em>
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className='flex gap-2 items-center flex-wrap'>
                                <div className='flex gap-1'>
                                    <p className='text-nowrap'>{releaseDate}</p>
                                    <p className='uppercase'>({details.original_language})</p>
                                </div>
                                {duration && (
                                    <>
                                        <img src='/icons/circle.svg' className='w-1' />
                                        <p className='text-nowrap'>{duration}</p>
                                    </>
                                )}
                                <img src='/icons/circle.svg' className='w-1' />
                                {details?.genres?.map((genre, index) => (
                                    <span key={index}>
                                        {genre.name}
                                        {index < details.genres.length - 1 && ", "}
                                    </span>
                                ))}
                            </div>
                            <div className='flex gap-3 flex-wrap mt-2'>
                                {trailer && (
                                    <a
                                        href='#trailer'
                                        className='inline-flex items-center gap-2 bg-green-45 text-black-06 font-bold text-sm rounded-lg px-5 py-2.5 w-fit hover:shadow-custom transition'
                                    >
                                        <svg viewBox='0 0 24 24' width='16' height='16' fill='currentColor'><polygon points='8,5 19,12 8,19' /></svg>
                                        Assistir trailer
                                    </a>
                                )}
                                <button
                                    onClick={toggleWatchlist}
                                    className={`inline-flex items-center gap-2 font-bold text-sm rounded-lg px-5 py-2.5 w-fit border transition ${isSaved ? 'bg-white/10 border-green-45 text-green-45' : 'bg-transparent border-black-20 text-white hover:bg-white/5'}`}
                                >
                                    <svg viewBox='0 0 24 24' width='16' height='16' fill={isSaved ? 'currentColor' : 'none'} stroke='currentColor' strokeWidth='2'>
                                        <path d='M12 21s-7.5-4.9-10-9.3C.4 8.2 2 4.5 5.6 4c2-.3 3.9.7 5 2.3C11.7 4.7 13.6 3.7 15.6 4c3.6.5 5.2 4.2 3.6 7.7C16.5 16.1 12 21 12 21z' />
                                    </svg>
                                    {isSaved ? 'Na minha lista' : 'Minha lista'}
                                </button>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-lg font-bold'>SINOPSE</h1>
                            <p>{details.overview}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default HeroMovieDetails;
