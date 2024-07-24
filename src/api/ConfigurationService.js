import axios from "axios";

const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/configuration',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMzFiNDM0MDI0OTgzZWNhNGM3ZjUzZmM5MTI1OGJhNSIsIm5iZiI6MTcyMTM4MjI5NC4yNjE4MTYsInN1YiI6IjY2OTkyMDRiYTdkYmEyMzI4MjhhYzVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CbkKG1BK5Rkg8OfsG4LWS_kHTP4mlk82ITX75SgeBFw'
    }
};

export class ConfigurationService {
    static get() {
        return axios
            .request(options)
            .then(response => response.data)
            .catch(error => {
                console.error(error);
                throw error;
            });
    }
}
