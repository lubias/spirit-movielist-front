import axios from "axios";

export class moviesDetailsService {
    static getImages(id) {
        const options = {
            url: 'https://api.themoviedb.org/3/movie/' + id + '/images',
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

    static getDetails(id) {
        const options = {
            url: 'https://api.themoviedb.org/3/movie/' + id + '?language=en-US',
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