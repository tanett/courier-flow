import {
    typeChangePasswordByTokenRequest,
    typeForgotPasswordRequest,
    typeGetCurrentUserResponse, typePatchCurrentUser, typeChangePasswordFirstLoginRequest,
} from './types';
import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protectedRoutsAPIHeaderCreator';


export const userProfileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get current user
        getCurrentUser: builder.query<typeGetCurrentUserResponse, unknown>({
            query: () => (
                {
                    url: API_URLS.USER_GET_CURRENT,
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        // Set user
        patchCurrentUser: builder.mutation<typeGetCurrentUserResponse['actor'], typePatchCurrentUser>({
            query: (data) => (
                {
                    url: API_URLS.USER_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // Change password
        changePassword: builder.mutation<unknown, typeChangePasswordFirstLoginRequest | typeChangePasswordByTokenRequest>({
            query: (data) => (
                {
                    url: API_URLS.USER_CHANGE_PASSWORD,
                    method: 'PATCH',
                    body: data,
                }
            ),
        }),

        // Ask email to change password
        askEmailToPassword: builder.query<unknown, typeForgotPasswordRequest>({
            query: (data) => (
                {
                    url: API_URLS.USER_FORGOT_PASSWORD,
                    params: { email: data.email },
                }
            ),
        }),

    }),
});

export const {
    useLazyGetCurrentUserQuery,
    usePatchCurrentUserMutation,
    useChangePasswordMutation,
    useLazyAskEmailToPasswordQuery,

} = userProfileApi;
