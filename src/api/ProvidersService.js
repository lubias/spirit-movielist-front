import { tmdbClient } from "./httpClient";

export class ProvidersService {
    static getProviders() {
        return tmdbClient.get('/watch/providers/tv', {
            params: { language: 'pt-BR', watch_region: 'BR' }
        });
    }
}
