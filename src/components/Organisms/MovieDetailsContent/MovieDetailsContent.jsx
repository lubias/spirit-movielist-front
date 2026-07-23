'use client';
import React, { useEffect, useState } from 'react'
import { moviesDetailsService } from '@/api/MovieDetailsService';
import CardCast from '@/components/Atoms/CardCast/CardCast';
import ProviderChip from '@/components/Atoms/ProviderChip/ProviderChip';
import CardMovie from '@/components/Atoms/CardMovie/CardMovie';
import CardSerie from '@/components/Atoms/CardSerie/CardSerie';
import HScrollCarousel from '@/components/Molecules/HScrollCarousel/HScrollCarousel';

const STATUS_PT = {
    'Released': 'Lançado',
    'Returning Series': 'Em exibição',
    'Ended': 'Finalizada',
    'Canceled': 'Cancelada',
    'In Production': 'Em produção',
    'Post Production': 'Pós-produção',
    'Planned': 'Planejada',
};

const formatUSD = (value) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
}).format(value);

function MovieDetailsContent({ id, type, configuration, details, trailer }) {
    const [cast, setCast] = useState([]);
    const [providers, setProviders] = useState(null);
    const [recommendations, setRecommendations] = useState([]);
    const [playingTrailer, setPlayingTrailer] = useState(false);

    useEffect(() => {
        setPlayingTrailer(false);

        moviesDetailsService.getCredits(id, type)
            .then(response => setCast(response.cast?.slice(0, 12) ?? []))
            .catch(error => console.error("Erro ao buscar elenco.", error));

        moviesDetailsService.getWatchProviders(id, type)
            .then(setProviders)
            .catch(error => console.error("Erro ao buscar streamings.", error));

        moviesDetailsService.getRecommendations(id, type)
            .then(response => setRecommendations(response.results?.slice(0, 12) ?? []))
            .catch(error => console.error("Erro ao buscar recomendações.", error));
    }, [id, type]);

    if (!details) return null;

    const infoItems = type === 'movie' ? [
        { key: 'Duração', value: details.runtime ? `${details.runtime} min` : '—' },
        { key: 'Status', value: STATUS_PT[details.status] ?? details.status ?? '—' },
        { key: 'Orçamento', value: details.budget ? formatUSD(details.budget) : '—' },
        { key: 'Bilheteria', value: details.revenue ? formatUSD(details.revenue) : '—' },
        { key: 'Produtora', value: details.production_companies?.[0]?.name ?? '—' },
        { key: 'País de origem', value: details.production_countries?.[0]?.name ?? '—' },
    ] : [
        { key: 'Duração por episódio', value: details.last_episode_to_air?.runtime ? `${details.last_episode_to_air.runtime} min` : '—' },
        { key: 'Status', value: STATUS_PT[details.status] ?? details.status ?? '—' },
        { key: 'Temporadas', value: details.number_of_seasons ?? '—' },
        { key: 'Episódios', value: details.number_of_episodes ?? '—' },
        { key: 'Emissora', value: details.networks?.[0]?.name ?? '—' },
        { key: 'Criado por', value: details.created_by?.length ? details.created_by.map(creator => creator.name).join(', ') : '—' },
    ];

    const hasProviders = providers && (providers.flatrate?.length || providers.rent?.length || providers.buy?.length);

    const transactionalProviders = new Map();
    [['rent', 'aluguel'], ['buy', 'compra']].forEach(([key, label]) => {
        providers?.[key]?.forEach(provider => {
            const existing = transactionalProviders.get(provider.provider_id);
            transactionalProviders.set(provider.provider_id, {
                provider,
                badges: [...(existing?.badges ?? []), label],
            });
        });
    });

    return (
        <div className='px-96 lg_1:px-40 lg_4:px-20 md_3:px-5 space-y-16'>
            {trailer && (
                <section id='trailer' className='space-y-4'>
                    <h2 className='font-semibold text-2xl'>Trailer</h2>
                    {playingTrailer ? (
                        <div className='aspect-video rounded-xl overflow-hidden bg-black-06'>
                            <iframe
                                className='w-full h-full'
                                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                                title={trailer.name}
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <button
                            onClick={() => setPlayingTrailer(true)}
                            className='relative aspect-video w-full rounded-xl overflow-hidden group'
                        >
                            <img
                                src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                                alt={trailer.name}
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-black-06/50 flex items-center justify-center'>
                                <div className='w-16 h-16 rounded-full bg-green-45 flex items-center justify-center shadow-custom group-hover:scale-105 transition'>
                                    <svg viewBox='0 0 24 24' width='22' height='22' fill='#0F0F0F'><polygon points='8,5 19,12 8,19' /></svg>
                                </div>
                            </div>
                        </button>
                    )}
                </section>
            )}

            {cast.length > 0 && (
                <section className='space-y-4'>
                    <h2 className='font-semibold text-2xl'>Elenco</h2>
                    <HScrollCarousel>
                        {cast.map(person => (
                            <CardCast key={person.id} person={person} configuration={configuration} />
                        ))}
                    </HScrollCarousel>
                </section>
            )}

            {hasProviders && (
                <section className='space-y-4'>
                    <h2 className='font-semibold text-2xl'>Onde assistir</h2>
                    <div className='flex flex-wrap gap-3'>
                        {providers.flatrate?.map(provider => (
                            <ProviderChip key={`flatrate-${provider.provider_id}`} provider={provider} configuration={configuration} badge='assinatura' />
                        ))}
                        {Array.from(transactionalProviders.values()).map(({ provider, badges }) => (
                            <ProviderChip key={`transactional-${provider.provider_id}`} provider={provider} configuration={configuration} badge={badges.join(' · ')} />
                        ))}
                    </div>
                </section>
            )}

            <section className='space-y-4'>
                <h2 className='font-semibold text-2xl'>Informações</h2>
                <div className='grid grid-cols-3 md_3:grid-cols-2 sm_1:grid-cols-1 gap-px bg-black-15 border border-black-15 rounded-xl overflow-hidden'>
                    {infoItems.map(item => (
                        <div key={item.key} className='bg-black-10 p-5'>
                            <p className='text-xs font-bold uppercase tracking-wide text-white/40 mb-1.5'>{item.key}</p>
                            <p className='text-[15px] font-semibold tabular-nums'>{item.value}</p>
                        </div>
                    ))}
                </div>
            </section>

            {recommendations.length > 0 && (
                <section className='space-y-4'>
                    <h2 className='font-semibold text-2xl'>Você também pode gostar</h2>
                    <HScrollCarousel>
                        {recommendations.map(item => (
                            type === 'movie'
                                ? <CardMovie key={item.id} movie={item} configuration={configuration} />
                                : <CardSerie key={item.id} serie={item} configuration={configuration} />
                        ))}
                    </HScrollCarousel>
                </section>
            )}
        </div>
    )
}

export default MovieDetailsContent
