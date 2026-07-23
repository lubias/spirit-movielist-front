import axios from "axios";

export const tmdbClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`
    }
});

tmdbClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
        console.error(error);
        throw error;
    }
);
