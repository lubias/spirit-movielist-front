import Link from 'next/link'
import React from 'react'

function CardGenre({ genre }) {
    return (
        <Link
            href={`/genres/${genre.id}`}
            className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
        >
            <div className="w-60 rounded-lg bg-black-06 p-4 !pt-20 sm:p-6">
                <h3 className="mt-0.5 text-lg font-medium text-white">
                    {genre.name}
                </h3>
            </div>
        </Link>
    )
}

export default CardGenre