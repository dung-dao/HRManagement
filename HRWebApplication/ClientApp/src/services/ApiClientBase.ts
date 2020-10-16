import authService from '../components/api-authorization/AuthorizeService';

export class ApiClientBase {
    protected transformOptions = async (options: RequestInit): Promise<RequestInit> => {
        const token = await authService.getAccessToken();
        options.headers = {
            ...options.headers,
            Authorization: 'Bearer ' + token,
        };
        return Promise.resolve(options);
    };
}
