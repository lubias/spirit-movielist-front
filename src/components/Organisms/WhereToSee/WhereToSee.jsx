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

    return (
        <div className='px-96 lg_1:px-40 lg_4:px-20 mb-20 space-y-10'>
            <h1 className='font-bold text-4xl'>Where to see<span className='text-green-45'>?</span></h1>
            {
                Array.isArray(providers) && providers.length > 0 && (
                    <>
                        <div className='flex flex-wrap gap-7 justify-center sm_1:hidden'>
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
                        <div className='sm_1:flex justify-center hidden'>
                            <Swiper
                                autoplay={{
                                    delay: 2500,
                                    disableOnInteraction: false,
                                }}
                                centeredSlides={true}
                                modules={[Autoplay]}
                                className="mySwiper"
                            >
                                {providers.map((provider, index) => (
                                    configuration && configuration.poster_sizes && configuration.poster_sizes.length > 3 ? (
                                        <SwiperSlide key={index}>
                                            <CardProvider
                                                src={`${configuration.base_url}${configuration.poster_sizes[3]}${provider.logo_path}`}
                                                name={provider.provider_name}
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
