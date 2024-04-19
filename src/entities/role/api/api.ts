import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRolesFilter, typeSearchRolesSortingNames } from 'entities/role/api/types';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeRole, typeRolesExtended } from 'entities/role/model/types';


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
        }),

    }),
});

export const {
    useLazySearchRolesQuery,
    useLazySearchRolesExtendedQuery,
    useSearchRolesOneQuery,
} = rolesApi;
