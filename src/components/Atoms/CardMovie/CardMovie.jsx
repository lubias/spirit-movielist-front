import Link from 'next/link'
import React from 'react'

function CardMovie({ movie, configuration }) {
    return (
        <Link
            href={`/details/${movie.id}`}
            className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
        >
            <div className="w-60 h-[420px] rounded-lg bg-black-06">
                <img src={`${configuration.base_url}${configuration.poster_sizes[3]}${movie.poster_path}`} alt={`Poster of ${movie.title}`} className='w-full h-[360px] rounded-t-lg' />
                <div className='p-4'>
                    <h3 className="mt-0.5 font-medium text-white text-nowrap overflow-hidden">
                        {movie.title}
                    </h3>
                </div>
            </div>
        </Link>

    )
}

export default CardMovie