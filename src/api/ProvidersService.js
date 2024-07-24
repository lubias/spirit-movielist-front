import axios from "axios";

export class ProvidersService {
    static getProviders() {
        const options = {
            url: 'https://api.themoviedb.org/3/watch/providers/tv?language=en-US&watch_region=PT',
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
