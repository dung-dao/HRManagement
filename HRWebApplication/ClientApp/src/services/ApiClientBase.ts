import authService from 'services/AuthService';

export class ApiClientBase {
  protected transformOptions = (options: RequestInit): Promise<RequestInit> => {
    try {
      const token = authService.getAccessToken();
      options.headers = {
        ...options.headers,
        Authorization: 'Bearer ' + token,
      };
      return Promise.resolve(options);
    } catch (err) {
      return Promise.reject(err);
    }
  };
}
