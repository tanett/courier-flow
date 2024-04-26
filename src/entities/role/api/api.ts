import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { tagTypesRolesExtendedList, typeSearchRolesFilter, typeSearchRolesSortingNames } from './types';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeRole, typeRolesExtended } from '../model/types';


export const rolesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search roles
        searchRoles: builder.query<typeSearchResponse<typeRole>, typeSearchRequest<typeSearchRolesFilter, typeSearchRolesSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.ROLES_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // Search roles one (return first found item)
        searchRolesOne: builder.query<typeRole, typeSearchRolesFilter>({
            query: (data) => (
                {
                    url: API_URLS.ROLES_SEARCH_ONE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // Search roles with description && userCount
        searchRolesExtended: builder.query<typeSearchResponse<typeRolesExtended>, typeSearchRequest<typeSearchRolesFilter, typeSearchRolesSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.ROLES_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeRolesExtended) => ({ type: tagTypesRolesExtendedList.rolesExtendedList.type, id: item.id.toString() })),
                    tagTypesRolesExtendedList.rolesExtendedList
                ]
                : [ tagTypesRolesExtendedList.rolesExtendedList ],
        }),

    }),
});

export const {
    useLazySearchRolesQuery,
    useSearchRolesExtendedQuery,
    useSearchRolesOneQuery,
} = rolesApi;
