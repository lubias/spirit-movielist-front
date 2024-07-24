import Link from 'next/link'
import React from 'react'

function Footer() {
    return (
        <div className='px-40 lg_1:px-24 sm_1:px-5 md_2:px-10 pt-20 pb-12 bg-black-06'>
            <div className='flex justify-between mb-20 md_1:grid md_1:grid-cols-2'>
                <div className='flex flex-col'>
                    <p className='mb-5'>Home</p>
                    <Link href="#">Categories</Link>
                    <Link href="#">Devices</Link>
                    <Link href="#">Pricing</Link>
                    <Link href="#">FAQ</Link>
                </div>
                <div className='flex flex-col'>
                    <p className='mb-5'>Movies</p>
                    <Link href="#">Genres</Link>
                    <Link href="#">Trending</Link>
                    <Link href="#">New Release</Link>
                    <Link href="#">Popular</Link>
                </div>
                <div className='flex flex-col'>
                    <p className='mb-5'>Shows</p>
                    <Link href="#">Genres</Link>
                    <Link href="#">Trending</Link>
                    <Link href="#">New Release</Link>
                    <Link href="#">Popular</Link>
                </div>
                <div className='flex flex-col'>
                    <p className='mb-5'>Support</p>
                    <Link href="#">Contact Us</Link>
                </div>
                <div className='flex flex-col'>
                    <p className='mb-5'>Subscription</p>
                    <Link href="#">Plans</Link>
                    <Link href="#">Features</Link>
                </div>
                <div>
                    <p className='mb-5'>Connect With Us</p>
                    <div className='flex gap-2'>
                        <img src='/icons/facebook.svg' className='sm_1:w-10' />
                        <img src='/icons/twitter.svg' className='sm_1:w-10' />
                        <img src='/icons/linkedin.svg' className='sm_1:w-10' />
                    </div>
                </div>
            </div>
            <div className='w-full h-[1px] bg-slate-300 opacity-35'></div>
            <div className='flex justify-between items-center mt-3 md_2:grid md_2:grid-cols-1 md_2:gap-5'>
                <p className='text-sm md_2:text-center'>@2023 streamvib, All Rights Reserved</p>
                <div className='flex gap-5 items-center md_2:grid md_2:grid-cols-1 md_2:text-center'>
                    <Link href="#" className='text-sm'>Termos of Use</Link>
                    <img src='/images/hr_vertical.svg' className='md_2:hidden' />
                    <Link href="#" className='text-sm'>Privacy Policy</Link>
                    <img src='/images/hr_vertical.svg' className='md_2:hidden' />
                    <Link href="#" className='text-sm'>Cookie Policy</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer