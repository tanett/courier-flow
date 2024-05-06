import {
    iLoginResponse,
    iLoginResponseTransform,
    typeLoginRequest,

} from './types';
import { API_URLS } from 'app/config/api-urls';
import { authApi } from 'app/api/auth-api';


export const authApiSlice = authApi.injectEndpoints({
    endpoints: (builder) => ({

        // Login
        login: builder.mutation<iLoginResponseTransform, typeLoginRequest>({
            query: (credentials) => ({
                url: API_URLS.AUTH_LOGIN,
                method: 'POST',
                body: credentials,
                credentials: 'include',
            }),
            transformResponse: (response: iLoginResponse, meta, arg) => {

                const xcsrf = meta?.response?.headers.get('x-csrf-token') || '';
                return {

                    ...response,
                    X_CSRF_TOKEN: xcsrf,

                };

            },
        }),

    }),
});

export const { useLoginMutation } = authApiSlice;
