import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSale, typeSaleShort, typeSaleShortExtended } from '../model/types';
import { tagTypesShortSalesList, typeSearchFilterSales, typeSearchSalesSortingNames } from './types';
import { typeExport } from '../../exports/api/types';
import { localeHeaderCreator } from 'app/utils/locale-header-creator';
import { responseToBlob } from 'shared/utils/response-to-blob';


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
            )
        }),
// Search sales with refunds count
        searchSalesShortExtended: builder.query<typeSearchResponse<typeSaleShortExtended>, typeSearchRequest<typeSearchFilterSales, typeSearchSalesSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.SALES_SHORT_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeSaleShort) => ({
                        type: tagTypesShortSalesList.shortSalesList.type,
                        id: item.id.toString()
                    })),
                    tagTypesShortSalesList.shortSalesList
                ]
                : [ tagTypesShortSalesList.shortSalesList ],
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

        // export sales
        exportSales: builder.query<typeExport, { filter: typeSearchFilterSales }>({
            query: (data) => (
                {
                    url: API_URLS.SALES_EXPORT,
                    method: 'POST',
                    headers: {
                        ...protectedRoutsAPIHeaderCreator(),
                        ...localeHeaderCreator(),

                    },
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),
        //get sale receipt by id
        getSaleReceiptById: builder.query<Blob, string>({
            query: (id) => (
                {
                    url: API_URLS.SALES_RECEIPT_GET.replace('{saleId}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                    responseHandler: async (response) => {

                        if (response.status === 200) {

                            const t = await responseToBlob(response);

                            return t;
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
    useSearchSalesShortQuery,
    useLazySearchSalesShortQuery,
    useSearchSalesShortExtendedQuery,
    useLazySearchSalesShortExtendedQuery,
    useGetSaleByIdShortQuery,
    useGetSaleByIdQuery,
    useLazyExportSalesQuery,
    useLazyGetSaleReceiptByIdQuery,
    useGetSaleReceiptByIdQuery,
} = salesApi;
