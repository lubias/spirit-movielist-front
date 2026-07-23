import { tmdbClient } from "./httpClient";

export class listsSeriesService {
    static getGenres() {
        return tmdbClient.get('/genre/tv/list', {
            params: { language: 'pt-BR' }
        });
    }

    static getByGenre(genre_id, page = 1) {
        return tmdbClient.get('/discover/tv', {
            params: {
                include_adult: false,
                include_null_first_air_dates: false,
                language: 'pt-BR',
                page,
                sort_by: 'popularity.desc',
                with_genres: genre_id
            }
        });
    }
}
