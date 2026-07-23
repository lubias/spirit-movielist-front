import { tmdbClient } from "./httpClient";

export class listsMoviesServices {
    static get(nameList) {
        return tmdbClient.get(`/movie/${nameList}`, {
            params: { language: 'pt-BR', page: 1 }
        });
    }

    static getGenres() {
        return tmdbClient.get('/genre/movie/list', {
            params: { language: 'pt-BR' }
        });
    }

    static getByGenre(genre_id, page = 1) {
        return tmdbClient.get('/discover/movie', {
            params: {
                include_adult: false,
                include_video: false,
                language: 'pt-BR',
                page,
                sort_by: 'popularity.desc',
                with_genres: genre_id
            }
        });
    }
}
