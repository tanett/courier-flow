import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeUser } from '../../user-profile/model/state-slice';
import {
    tagTypesExtendedUsersList,
    typeCreateUserRequest,
    typeEditUserRequest,
    typeSearchFilterUsers, typeSearchUserSortingNames, typeUserToArchiveRequest,
} from './types';
import { typeUserWithStoresName } from '../model/types';


export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search user
        searchUser: builder.query<typeSearchResponse<typeUser>, typeSearchRequest<typeSearchFilterUsers, typeSearchUserSortingNames>>({
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

        // Search user
        extendedSearchUser: builder.query<typeSearchResponse<typeUserWithStoresName>, typeSearchRequest<typeSearchFilterUsers, typeSearchUserSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.USER_LIST_EXTENDED_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeUserWithStoresName) => ({ type: tagTypesExtendedUsersList.extendedUsersList.type, id: item.id.toString() })),
                    tagTypesExtendedUsersList.extendedUsersList
                ]
                : [ tagTypesExtendedUsersList.extendedUsersList ],
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
            invalidatesTags: [tagTypesExtendedUsersList.extendedUsersList]
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
            invalidatesTags: [tagTypesExtendedUsersList.extendedUsersList]
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
            invalidatesTags: [tagTypesExtendedUsersList.extendedUsersList]
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
    useExtendedSearchUserQuery,
    useCreateUserMutation,
    useUserToArchiveMutation,
} = usersApi;
