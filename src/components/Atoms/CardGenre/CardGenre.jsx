import Link from 'next/link'
import React from 'react'

const AURORAS = [
    { a: '#4ade80', b: '#22d3ee' }, // verde -> ciano
    { a: '#22d3ee', b: '#3b82f6' }, // ciano -> azul
    { a: '#3b82f6', b: '#a855f7' }, // azul -> roxo
    { a: '#a855f7', b: '#e879f9' }, // roxo -> magenta
    { a: '#4ade80', b: '#a855f7' }, // verde -> roxo
];

function CardGenre({ genre, type = 'movie' }) {
    const aurora = AURORAS[genre.id % AURORAS.length];

    return (
        <Link
            href={`/genre/${type}/${genre.id}`}
            className="sm_1:w-80 hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
        >
            <div className="relative w-60 sm_1:w-full rounded-lg bg-black-06 p-4 !pt-20 sm:p-6 overflow-hidden">
                <div
                    className="absolute -top-16 left-0 w-40 h-40 rounded-full blur-3xl opacity-40 pointer-events-none"
                    style={{ background: aurora.a }}
                />
                <div
                    className="absolute -top-10 right-0 w-40 h-40 rounded-full blur-3xl opacity-35 pointer-events-none"
                    style={{ background: aurora.b }}
                />
                <h3 className="relative mt-0.5 text-lg font-medium text-white">
                    {genre.name}
                </h3>
            </div>
        </Link>
    )
}

export default CardGenre
