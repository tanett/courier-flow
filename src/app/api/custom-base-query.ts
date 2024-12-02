import { API_URLS } from 'app/config/api-urls';
import { Mutex } from 'async-mutex';
import { type BaseQueryFn, type FetchArgs, fetchBaseQuery, type FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { iLoginResponse, iLoginResponseTransform } from '../../entities-project/auth/api/types';
import { authStateActions } from '../../entities-project/auth/model/state-slice';
import { setAuthTerminalSessionStorageDate } from 'features/login-terminal/helpers/setAuthSessionStorageDate';
import { createBaseUrl } from 'app/utils/create-base-url';


export const REFRESH_URL = API_URLS.AUTH_REFRESH;
export const REFRESH_URL_TERMINAL = API_URLS.AUTH_REFRESH;

// const urls_for_terminals = [API_URLS.SALES_MAKE_NEW, API_URLS.BUNDLE_GET];

// Create a new mutex
const mutex = new Mutex();
const stand = localStorage.getItem('stand');
export const baseQuery = fetchBaseQuery({ });

export const authQuery = fetchBaseQuery({ });


export const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {

    // Wait until the mutex is available without locking it
    await mutex.waitForUnlock();

    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401 && sessionStorage.getItem('passwordT')) {

        // Checking whether the mutex is locked
        if (!mutex.isLocked()) {

            const release = await mutex.acquire();

            try {
                const login = sessionStorage.getItem('loginT');
                const password = sessionStorage.getItem('passwordT');
                // const t = sessionStorage.getItem('accessTokenValue');
                // const x = sessionStorage.getItem('refresh');

                const myHeaders = new Headers();

                // if (x && t) {
                //
                //     myHeaders.append('Accept', 'application/json');
                //     myHeaders.append('X-CSRF-TOKEN', x);
                //
                // }

                const newTokenResult = await authQuery(
                    {
                        url: createBaseUrl() +  API_URLS.AUTH_TERMINAL,
                        method: 'POST',
                       body: JSON.stringify({login, password}),
                    },
                    api,
                    extraOptions
                );
                // const refreshResult = await authQuery(
                //     {
                //         url: REFRESH_URL,
                //         method: 'POST',
                //         headers: myHeaders,
                //         credentials: 'include',
                //     },
                //     api,
                //     extraOptions
                // );


                if (newTokenResult.data) {

                    const responseResult: iLoginResponseTransform = {
                        accessToken: (newTokenResult.data as iLoginResponse).accessToken,
                        accessTokenExpiresAt: (newTokenResult.data as iLoginResponse).accessTokenExpiresAt,
                        accessTokenIssuedAt: (newTokenResult.data as iLoginResponse).accessTokenIssuedAt,
                        X_CSRF_TOKEN: newTokenResult?.meta?.response?.headers.get('x-csrf-token') || '',
                    };
                    setAuthTerminalSessionStorageDate(responseResult);
                   // setAuthSessionStorageDate(responseResult);

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
