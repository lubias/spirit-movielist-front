'use client';
import { ProvidersService } from '@/api/ProvidersService';
import CardProvider from '@/components/Atoms/CardProvider/CardProvider';
import { configurationAtom } from '@/states/ConfigurationAtom';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

function WhereToSee() {
    const [providers, setProviders] = useState([]);
    const [configuration] = useAtom(configurationAtom);
    const [nSlides, setNSlides] = useState(4);

    const handleGetProviders = async () => {
        try {
            const response = await ProvidersService.getProviders();
            const arr = response.results;
            const topProviders = arr
                .sort((a, b) => a.display_priority - b.display_priority)
                .slice(0, 16);

            setProviders(topProviders);
        } catch (error) {
            console.error("Erro ao realizar a busca.", error);
        }
    };

    useEffect(() => {
        handleGetProviders();
    }, []);

    useEffect(() => {
        const updateVisibleCards = () => {
            const width = window.innerWidth;
            if (width >= 690) {
                setNSlides(4);
            } else if (width > 520) {
                setNSlides(3);
            } else {
                setNSlides(1);
            }
        };

        updateVisibleCards();
        window.addEventListener('resize', updateVisibleCards);
        return () => window.removeEventListener('resize', updateVisibleCards);
    }, []);

    return (
        <div className='px-96 lg_1:px-40 lg_4:px-20 md_1:px-0 md_3:px-5 mb-20 space-y-10'>
            <h1 className='font-bold text-4xl md_1:text-center'>Where to see<span className='text-green-45'>?</span></h1>
            {
                Array.isArray(providers) && providers.length > 0 && (
                    <>
                        <div className='flex flex-wrap gap-7 justify-center md_1:hidden'>
                            {providers.map((provider, index) => (
                                configuration && configuration.poster_sizes && configuration.poster_sizes.length > 3 ? (
                                    <CardProvider
                                        key={index}
                                        src={`${configuration.base_url}${configuration.poster_sizes[3]}${provider.logo_path}`}
                                        name={provider.provider_name}
                                    />
                                ) : null
                            ))}
                        </div>
                        <div className='md_1:block hidden'>
                            <Swiper
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                centeredSlides={true}
                                modules={[Autoplay]}
                                loop={true}
                                slidesPerView={nSlides}
                                className="flex justify-center"
                            >
                                {providers.map((provider, index) => (
                                    configuration && configuration.poster_sizes && configuration.poster_sizes.length > 3 ? (
                                        <SwiperSlide key={index}>
                                            <CardProvider
                                                src={`${configuration.base_url}${configuration.poster_sizes[3]}${provider.logo_path}`}
                                                name={provider.provider_name}
                                                carousel={true}
                                            />
                                        </SwiperSlide>
                                    ) : null
                                ))}
                            </Swiper>
                        </div>
                    </>
                )
            }
        </div >
    );
}

export default WhereToSee;
