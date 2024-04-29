import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSale, typeSaleShort } from '../model/types';
import { typeSearchFilterSales, typeSearchSalesSortingNames } from './types';

export const salesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search sales
        searchSalesShort: builder.query<typeSearchResponse<typeSaleShort>, typeSearchRequest<typeSearchFilterSales, typeSearchSalesSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.SALES_SHORT_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        //get sale by id full
        getSaleById: builder.query<typeSale, string>({
            query: (id) => (
                {
                    url: API_URLS.SALES_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),
        //get sale by id short
        getSaleByIdShort: builder.query<typeSaleShort, string>({
            query: (id) => (
                {
                    url: API_URLS.SALES_SHORT_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

    }),
});

export const {
    useSearchSalesShortQuery,
    useLazySearchSalesShortQuery,
    useGetSaleByIdShortQuery
} = salesApi;
