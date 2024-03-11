import { API_URLS } from 'app/config/api-urls';
import { Mutex } from 'async-mutex';
import { type BaseQueryFn, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { iLoginResponse, iLoginResponseTransform } from '../../entities/auth/api/types';
import { setAuthSessionStorageDate } from 'features/login/helpers/setAuthSessionStorageDate';
import { authStateActions } from '../../entities/auth/model/state-slice';


export const REFRESH_URL = API_URLS.AUTH_REFRESH;

// Create a new mutex
const mutex = new Mutex();
export const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_API_URL });

export const authQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_AUTH_API_URL });


export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {

    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401 && sessionStorage.getItem('refresh')) {

        // Checking whether the mutex is locked
        if (!mutex.isLocked()) {

            const release = await mutex.acquire();

            try {

                const t = sessionStorage.getItem('accessTokenValue');
                const x = sessionStorage.getItem('refresh');

                const myHeaders = new Headers();

                if (x && t) {

                    myHeaders.append('Accept', 'application/json');
                    myHeaders.append('X-CSRF-TOKEN', x);

                }

                const refreshResult = await authQuery(
                    {
                        url: REFRESH_URL,
                        method: 'POST',
                        headers: myHeaders,
                        credentials: 'include',
                    },
                    api,
                    extraOptions
                );


                if (refreshResult.data) {

                    const responseResult: iLoginResponseTransform = {
                        accessToken: (refreshResult.data as iLoginResponse).accessToken,
                        accessTokenExpiresAt: (refreshResult.data as iLoginResponse).accessTokenExpiresAt,
                        accessTokenIssuedAt: (refreshResult.data as iLoginResponse).accessTokenIssuedAt,
                        X_CSRF_TOKEN: refreshResult?.meta?.response?.headers.get('x-csrf-token') || '',
                    };

                    setAuthSessionStorageDate(responseResult);

                    const newArgs = args;

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    newArgs.headers[ 'Authorization' ] = `Bearer ${responseResult.accessToken}`;

                    // Retry the initial query
                    result = await baseQuery(newArgs, api, extraOptions);

                } else {

                    api.dispatch(authStateActions.changeAuth(false));

                }

            } finally {

                // Release must be called once the mutex should be released again.
                release();

            }

        } else {

            // Wait until the mutex is available without locking it
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);

        }

    }

    return result;

};
