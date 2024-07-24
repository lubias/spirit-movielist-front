'use client';
import { listsMoviesServices } from '@/api/ListsMoviesService';
import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { configurationAtom } from '@/states/ConfigurationAtom';

function HeroHome() {
    const [list, setList] = useState([]);
    const [configuration] = useAtom(configurationAtom);
    const [selected, setSelected] = useState('now_playing');

    const handleGetList = async (nameList) => {
        try {
            const response = await listsMoviesServices.get(nameList);
            setList(response.results);
        } catch (error) {
            console.error("Erro ao obter a lista:", error);
        }
    };

    const isActive = (name) => {
        return selected === name;
    };

    function changeList(nameList) {
        handleGetList(nameList);
        setSelected(nameList);
    }

    useEffect(() => {
        handleGetList('now_playing')
    }, [])

    return (
        <div className='w-full !overflow-hidden h-[700px] relative flex flex-col justify-between items-start gap-10'>
            <div className='flex flex-col items-start mt-32 flex-1'>
                <div className='flex items-center gap-2'>
                    <div className={`${isActive('now_playing') ? 'w-28 bg-green-45 h-[2px]' : 'bg-white w-14 h-px'}  `} />
                    <button onClick={() => changeList("now_playing")} className={`${isActive('now_playing') ? 'font-semibold' : 'font-normal'}`}>Now Playing</button>
                </div>
                <div className='flex items-center gap-2'>
                    <div className={`${isActive('popular') ? 'w-28 bg-green-45 h-[2px]' : 'bg-white w-14 h-px'}`} />
                    <button onClick={() => changeList("popular")} className={`${isActive('popular') ? 'font-semibold' : 'font-normal'}`}>Popular</button>
                </div>
                <div className='flex items-center gap-2'>
                    <div className={`${isActive('top_rated') ? 'w-28 bg-green-45 h-[2px]' : 'bg-white w-14 h-px'}`} />
                    <button onClick={() => changeList("top_rated")} className={`${isActive('top_rated') ? 'font-semibold' : 'font-normal'}`}>Top Rated</button>
                </div>
                <div className='flex items-center gap-2'>
                    <div className={`${isActive('upcoming') ? 'w-28 bg-green-45 h-[2px]' : 'bg-white w-14 h-px'}`} />
                    <button onClick={() => changeList("upcoming")} className={`${isActive('upcoming') ? 'font-semibold' : 'font-normal'}`}>Upcoming</button>
                </div>
            </div>
            <div className='h-px w-full bg-white/40 absolute bottom-24 z-0' />
            <div className='flex gap-5 overflow-hidden w-fit items-end pb-10 -ml-10 h-full'>
                {list.map((film, index) => (
                    configuration?.base_url && configuration?.poster_sizes?.[1] ? (
                        <img key={index} src={`${configuration.base_url}${configuration.poster_sizes[1]}${film.poster_path}`} alt={`Poster of ${film.title}`} className='z-50 hover:scale-110 hover:duration-300' />
                    ) : (
                        <div key={index}>Loading...</div>
                    )
                ))}
            </div>
        </div>
    );
}

export default HeroHome;
