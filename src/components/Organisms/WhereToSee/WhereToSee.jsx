'use client';
import { ProvidersService } from '@/api/ProvidersService';
import CardProvider from '@/components/Atoms/CardProvider/CardProvider';
import { configurationAtom } from '@/states/ConfigurationAtom';
import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';

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
        <div className='px-96 mb-20'>
            <h1 className='font-bold text-4xl'>Where to see<span className='text-green-45'>?</span></h1>
            {
                Array.isArray(providers) && providers.length > 0 && (
                    <div className='grid grid-cols-8 gap-10'>
                        {providers.map((provider, index) => (
                            configuration ? (
                                <CardProvider
                                    key={index}
                                    src={`${configuration.base_url}${configuration.poster_sizes[3]}${provider.logo_path}`}
                                    name={provider.provider_name}
                                />
                            ) : null
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default WhereToSee;
