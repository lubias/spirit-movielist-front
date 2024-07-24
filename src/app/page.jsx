'use client'
import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { configurationAtom } from '@/states/ConfigurationAtom';
import { ConfigurationService } from '@/api/ConfigurationService';
import { listsMoviesServices } from '@/api/ListsMoviesService';
import { movieGenresAtom } from '@/states/MovieGenresAtom';
import { serieGenresAtom } from '@/states/SerieGenresAtom';
import { listsSeriesService } from '@/api/ListSeriesService';
import Home from '@/templates/Home/Home';

const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const page = () => {
  const [config, setConfig] = useAtom(configurationAtom);
  const [genres, setGenres] = useAtom(movieGenresAtom);
  const [serieGenres, setSerieGenres] = useAtom(serieGenresAtom);

  if (!config) {
    return <div>Loading...</div>;
  }

  const handleGetConfiguration = async () => {
    try {
      const response = await ConfigurationService.get();

      setConfig(response.images);
    } catch (error) {
      console.error("Erro ao realizar a busca.", error);
    }
  }

  const handleGetGenres = async () => {
    try {
      const response = await listsMoviesServices.getGenres();

      setGenres(response.genres)
    } catch (error) {
      console.error("Erro ao realizar a busca.", error);
    }
  }

  const handleGetSeriesGenres = async () => {
    try {
      const response = await listsSeriesService.getGenres()
      setSerieGenres(response.genres)
    } catch (error) {
      console.error("Erro ao realizar a busca.", error);
    }
  }

  useEffect(() => {
    if (isEmptyObject(config)) {
      handleGetConfiguration()
    }
  }, [config]);

  useEffect(() => {
    handleGetGenres()
    handleGetSeriesGenres()
  }, [])

  return (
    <Home />
  );
};

export default page;
