import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeExport, typeSearchExportFilter, typeSearchExportSortingNames } from './types';
import { typeSearchRequest, typeSearchResponse } from '../../../app/api/types';
import { expectedFileType, responseToBlobDownload } from 'shared/utils/response-to-blob-dowload';


export const exportApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Get export list
        getExportProductsList: builder.query<typeSearchResponse<typeExport>, typeSearchRequest<typeSearchExportFilter, typeSearchExportSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.EXPORTS_SEARCH,
                    method: 'POST',
                    body: data,
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        // Get export by id
        getExportById: builder.query<typeExport, string>({
            query: (id) => (
                {
                    url: API_URLS.EXPORTS_BY_ID.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        downloadExportFileById: builder.query<string, string>({
            query: (id) => (
                {
                    url: API_URLS.DOWNLOAD_EXPORT_FILE_BY_ID.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                    cache: 'no-cache',
                    responseHandler: async (response) => {

                        if (response.status === 200) {

                            await responseToBlobDownload(response, expectedFileType.xlsx);

                        } else {

                            return response.json();

                        }

                    },
                }
            ),

        }),

    }),
});

export const {
    useLazyGetExportByIdQuery,
    useLazyDownloadExportFileByIdQuery,
    useGetExportProductsListQuery,
} = exportApi;
