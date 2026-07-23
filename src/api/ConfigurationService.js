import { tmdbClient } from "./httpClient";

export class ConfigurationService {
    static get() {
        return tmdbClient.get('/configuration');
    }
}
