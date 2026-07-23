import { tmdbClient } from "./httpClient";

const pickTrailer = (results = []) =>
    results.find(video => video.site === 'YouTube' && video.type === 'Trailer' && video.official)
    ?? results.find(video => video.site === 'YouTube' && video.type === 'Trailer')
    ?? results.find(video => video.site === 'YouTube' && video.type === 'Teaser')
    ?? null;

export class moviesDetailsService {
    static getImages(id, type = 'movie') {
        return tmdbClient.get(`/${type}/${id}/images`);
    }

    static getDetails(id, type = 'movie') {
        return tmdbClient.get(`/${type}/${id}`, {
            params: { language: 'pt-BR' }
        });
    }

    static getCredits(id, type = 'movie') {
        return tmdbClient.get(`/${type}/${id}/credits`, {
            params: { language: 'pt-BR' }
        });
    }

    static async getTrailer(id, type = 'movie') {
        const ptBR = await tmdbClient.get(`/${type}/${id}/videos`, {
            params: { language: 'pt-BR' }
        });
        const trailer = pickTrailer(ptBR.results);
        if (trailer) return trailer;

        const enUS = await tmdbClient.get(`/${type}/${id}/videos`, {
            params: { language: 'en-US' }
        });
        return pickTrailer(enUS.results);
    }

    static getRecommendations(id, type = 'movie') {
        return tmdbClient.get(`/${type}/${id}/recommendations`, {
            params: { language: 'pt-BR', page: 1 }
        });
    }

    static async getWatchProviders(id, type = 'movie') {
        const response = await tmdbClient.get(`/${type}/${id}/watch/providers`);
        return response.results?.BR ?? null;
    }
}
