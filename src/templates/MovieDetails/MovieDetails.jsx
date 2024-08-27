import React, { useEffect, useState } from 'react'
import { moviesDetailsService } from '@/api/MovieDetailsService'
import Footer from '@/components/Organisms/Footer/Footer'
import Header from '@/components/Organisms/Header/Header'
import HeroMovieDetails from '@/components/Organisms/HeroMovieDetails/HeroMovieDetails'
import MovieDetailsContent from '@/components/Organisms/MovieDetailsContent/MovieDetailsContent'
import { useAtom } from 'jotai';
import { configurationAtom } from '@/states/ConfigurationAtom';
import { ConfigurationService } from '@/api/ConfigurationService'

const isEmptyObject = (obj) => {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
};

function MovieDetails({ id }) {
    const [configuration, setConfiguration] = useAtom(configurationAtom);
    const [imageBackground, setImageBackground] = useState('');
    const [imagePoster, setImagePoster] = useState('');
    const [details, setDetails] = useState([]);

    const handleGetImages = async () => {
        try {
            const response = await moviesDetailsService.getImages(id);
            setImageBackground(response.backdrops[1].file_path);
            setImagePoster(response.posters[1].file_path);
        } catch (error) {
            console.error("Erro ao realizar a busca.", error);
        }
    }

    const handleGetDetails = async () => {
        try {
            const response = await moviesDetailsService.getDetails(id);
            setDetails(response);
            console.log(response)
        } catch (error) {
            console.error("Erro ao realizar a busca.", error);
        }
    }

    const handleGetConfiguration = async () => {
        try {
            const response = await ConfigurationService.get();
            setConfiguration(response.images);
        } catch (error) {
            console.error("Erro ao realizar a busca.", error);
        }
    }

    useEffect(() => {
        if (isEmptyObject(configuration)) {
            handleGetConfiguration()
        } else {
            handleGetImages();
        }
    }, [configuration]);

    useEffect(() => {
        handleGetDetails();
    }, []);

    return (
        <div className='bg-black-08 space-y-20'>
            {!isEmptyObject(configuration) &&
                <div className='relative'>
                    <Header />
                    <div
                        style={{ backgroundImage: `url(${configuration.base_url}${configuration.backdrop_sizes[3]}${imageBackground})` }}
                        className='absolute top-0 bg-cover bg-no-repeat opacity-25 w-full z-1 h-full'
                    />
                    <HeroMovieDetails
                        configuration={configuration}
                        image={imagePoster}
                        details={details}
                    />
                </div>
            }
            <MovieDetailsContent />
            <Footer />
        </div>
    )
}

export default MovieDetails