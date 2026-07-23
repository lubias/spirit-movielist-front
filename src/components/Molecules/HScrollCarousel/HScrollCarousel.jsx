'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react'

function HScrollCarousel({ children }) {
    const scrollerRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateArrows = useCallback(() => {
        const el = scrollerRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 4);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    }, []);

    useEffect(() => {
        updateArrows();
        const el = scrollerRef.current;
        if (!el) return;
        const observer = new ResizeObserver(updateArrows);
        observer.observe(el);
        return () => observer.disconnect();
    }, [children, updateArrows]);

    const scroll = (direction) => {
        const el = scrollerRef.current;
        if (!el) return;
        el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: 'smooth' });
    };

    return (
        <div className='relative'>
            {canScrollLeft && (
                <button
                    onClick={() => scroll(-1)}
                    aria-label='Anterior'
                    className='md_3:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black-06/90 border border-black-20 flex items-center justify-center hover:bg-black-10 transition'
                >
                    <img src='/icons/arrowLeft.svg' className='h-3.5' alt='' />
                </button>
            )}
            <div
                ref={scrollerRef}
                onScroll={updateArrows}
                className='flex gap-5 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            >
                {children}
            </div>
            {canScrollRight && (
                <button
                    onClick={() => scroll(1)}
                    aria-label='Próximo'
                    className='md_3:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black-06/90 border border-black-20 flex items-center justify-center hover:bg-black-10 transition'
                >
                    <img src='/icons/arrowRight.svg' className='h-3.5' alt='' />
                </button>
            )}
        </div>
    )
}

export default HScrollCarousel
