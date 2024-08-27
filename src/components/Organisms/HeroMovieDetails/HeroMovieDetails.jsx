import React from 'react';

function HeroMovieDetails({ image, configuration, details }) {
    return (
        <div
            className='w-full h-full !overflow-hidden relative flex gap-10 px-40 py-10'
        >
            <img
                src={`${configuration.base_url}${configuration.poster_sizes[3]}${image}`}
                className='w-72 rounded-lg'
            />
            <div className='flex flex-col gap-2 relative'>
                {details && (
                    <>
                        <h1 className='font-bold text-4xl sm_1:text-center'>
                            {details.title} {details.release_date ? `(${details.release_date.split('-')[0]})` : ''}
                        </h1>
                        <div className='flex gap-2 items-center'>
                            <div className='flex gap-1'>
                                <p className='text-nowrap'>{details.release_date}</p>
                                <p className='uppercase'>({details.original_language})</p>
                            </div>
                            <img src='/icons/circle.svg' className='w-1' />
                            {details?.genres?.map((genre, index) => (
                                <span key={index}>
                                    {genre.name}
                                    {index < details.genres.length - 1 && ", "}
                                </span>
                            ))}
                        </div>
                        <div className='absolute bottom-0'>
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
