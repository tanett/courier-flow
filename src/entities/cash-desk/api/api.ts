import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import {
    typeCashDesk, typeSearchCashDeskSortingNames,
    typeSearchFilterCashDesk,
} from '../model/types';


export const cashDeskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search CashDesk
        searchCashDesk: builder.query<typeSearchResponse<typeCashDesk>, typeSearchRequest<typeSearchFilterCashDesk, typeSearchCashDeskSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.CASH_DESK_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),

        // Get z-report by id
        /* getZReportById: builder.query({
            query: (id) => (
                {
                    url: API_URLS.Z_REPORTS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }), */
    }),
});

export const { useSearchCashDeskQuery, useLazySearchCashDeskQuery } = cashDeskApi;
