import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeImportErrorResponse, typeImport, typeSearchImportFilter, typeSearchImportSortingNames } from './types';
import { typeSearchRequest, typeSearchResponse } from '../../../app/api/types';


export const importsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get import list
        getImportTerminalList: builder.query<typeSearchResponse<typeImport>, typeSearchRequest<typeSearchImportFilter, typeSearchImportSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.IMPORTS_SEARCH,
                    method: 'POST',
                    body: data,
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        // Get import by id
        getImportById: builder.query<typeImport | typeImportErrorResponse, string>({
            query: (id) => (
                {
                    url: API_URLS.IMPORTS_BY_ID.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

    }),
});

export const {
    useLazyGetImportByIdQuery,
    useGetImportTerminalListQuery,
} = importsApi;
