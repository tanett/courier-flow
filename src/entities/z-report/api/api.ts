import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import {typeSearchFilterZResponse, typeSearchZResponseSortingNames, typeZReport} from "../model/types";


export const zReportsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search z-reports
        searchZReport: builder.query<typeSearchResponse<typeZReport>, typeSearchRequest<typeSearchFilterZResponse, typeSearchZResponseSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.Z_REPORTS_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),

        // Get z-report by id
        getZReportById: builder.query({
            query: (id) => (
                {
                    url: API_URLS.Z_REPORTS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),


    }),
});

export const {
    useSearchZReportQuery,
    useLazyGetZReportByIdQuery,
} = zReportsApi;
