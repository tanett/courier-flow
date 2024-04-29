import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchFilterRefunds, typeSearchRefundsSortingNames } from './types';
import { typeRefund } from '../model/types';

export const refundsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // // Search sales
        // searchSalesShort: builder.query<typeSearchResponse<typeRefund>, typeSearchRequest<typeSearchFilterRefunds, typeSearchRefundsSortingNames>>({
        //     query: (data) => (
        //         {
        //             url: API_URLS.SALES_SHORT_SEARCH,
        //             method: 'POST',
        //             headers: protectedRoutsAPIHeaderCreator(),
        //             body: data,
        //         }
        //     ),
        // }),
        //
        // //get sale by id full
        // getSaleById: builder.query<typeSale, string>({
        //     query: (id) => (
        //         {
        //             url: API_URLS.SALES_GET.replace('{id}', id),
        //             method: 'GET',
        //             headers: protectedRoutsAPIHeaderCreator(),
        //         }
        //     ),
        // }),
        // //get sale by id short
        // getSaleByIdShort: builder.query<typeSaleShort, string>({
        //     query: (id) => (
        //         {
        //             url: API_URLS.SALES_SHORT_GET.replace('{id}', id),
        //             method: 'GET',
        //             headers: protectedRoutsAPIHeaderCreator(),
        //         }
        //     ),
        // }),

    }),
});

export const {
    // useSearchSalesShortQuery, useLazySearchSalesShortQuery, useGetSaleByIdShortQuery
} = refundsApi;
