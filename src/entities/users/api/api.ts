import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protectedRoutsAPIHeaderCreator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeUser } from 'entities/user-profile/model/state-slice';
import {
    typeCreateUserRequest,
    typeEditUserRequest,
    typeSearchFilter, typeSearchUserSortingNames, typeUserToArchiveRequest,
} from 'entities/users/api/types';

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search user
        searchUser: builder.query<typeSearchResponse<typeUser>, typeSearchRequest<typeSearchFilter, typeSearchUserSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.USER_LIST_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),


        // create user
        createUser: builder.mutation<typeUser, typeCreateUserRequest >({
            query: (data) => (
                {
                    url: API_URLS.USER_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // patch user
        patchUser: builder.mutation<typeUser, typeEditUserRequest >({
            query: (data) => (
                {
                    url: API_URLS.USER_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // user to archive
        userToArchive: builder.mutation<typeUser, typeUserToArchiveRequest >({
            query: (data) => (
                {
                    url: API_URLS.USER_ARCHIVE,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // get user by id
        getUserById: builder.query({
            query: (id) => (
                {
                    url: API_URLS.USER_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),


    }),
});

export const {
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    usePatchUserMutation,
    useLazySearchUserQuery,
    useCreateUserMutation,
    useUserToArchiveMutation,
} = usersApi;
