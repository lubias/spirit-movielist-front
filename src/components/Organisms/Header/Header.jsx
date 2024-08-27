import Link from 'next/link'
import React from 'react'

function Header() {
    return (
        <Link
            href="/"
            className='h-24 flex items-center justify-between sm_1:justify-center px-40 sm_1:px-5 w-full bg-black-06/50 z-50 relative'
        >
            <img src="/Logo.png" className="h-16" />
        </Link>
    )
}

export default Header