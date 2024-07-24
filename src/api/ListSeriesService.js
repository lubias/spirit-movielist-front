import axios from "axios";

export class listsSeriesService {


    static getGenres() {
        const options = {
            url: 'https://api.themoviedb.org/3/genre/tv/list?language=en',
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzFiNDM0MDI0OTgzZWNhNGM3ZjUzZmM5MTI1OGJhNSIsIm5iZiI6MTcyMTU4OTMyNC44MjAxMDcsInN1YiI6IjY2OTkyMDRiYTdkYmEyMzI4MjhhYzVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BH_VP1gjMrJEgjcO8v6pbO9BzsmD6uGxh2AdlpNjlRE'
            }
        }

        return axios
            .request(options)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    }

    static getByGenre(genre_id) {
        const options = {
            url: 'https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&without_genres=' + genre_id,
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzFiNDM0MDI0OTgzZWNhNGM3ZjUzZmM5MTI1OGJhNSIsIm5iZiI6MTcyMTU4OTMyNC44MjAxMDcsInN1YiI6IjY2OTkyMDRiYTdkYmEyMzI4MjhhYzVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BH_VP1gjMrJEgjcO8v6pbO9BzsmD6uGxh2AdlpNjlRE'
            }
        }

        return axios
            .request(options)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    }
}