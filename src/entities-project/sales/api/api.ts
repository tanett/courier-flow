import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeCreateSale, typeSale, typeSaleShort, typeSaleShortExtended } from '../model/types';
import { tagTypesShortSalesList, typeResponseCreateSale, typeSearchFilterSales, typeSearchSalesSortingNames } from './types';
import { localeHeaderCreator } from 'app/utils/locale-header-creator';
import { responseToBlob } from 'shared/utils/response-to-blob';



export const salesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search sales
        searchSalesShort: builder.query<typeSearchResponse<typeSaleShort>, typeSearchRequest<typeSearchFilterSales, typeSearchSalesSortingNames>>({
            query: (data) => (
                {
                    url:  API_URLS.SALES_SHORT_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(true),
                    body: data,
                }
            ),
        }),

        // Search sales with refunds count
        searchSalesShortExtended: builder.query<typeSearchResponse<typeSaleShortExtended>, typeSearchRequest<typeSearchFilterSales, typeSearchSalesSortingNames>>({
            query: (data) => (
                {
                    url:  API_URLS.SALES_SHORT_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(true),
                    body: data,
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeSaleShort) => ({
                        type: tagTypesShortSalesList.shortSalesList.type,
                        id: item.id.toString(),
                    })),
                    tagTypesShortSalesList.shortSalesList
                ]
                : [ tagTypesShortSalesList.shortSalesList ],
        }),

        // get sale by id full
        getSaleById: builder.query<typeSale, string>({
            query: (id) => (
                {
                    url: API_URLS.SALES_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(true),
                }
            ),
        }),

        // get sale by id short
        getSaleByIdShort: builder.query<typeSaleShort, string>({
            query: (id) => (
                {
                    url:  API_URLS.SALES_SHORT_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(true),
                }
            ),
        }),


        // get sale receipt by id
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

        // makeSale
        makeSale: builder.mutation<typeResponseCreateSale, {sale: typeCreateSale, IdempotentKey: string }>({
            query: (data) => (
                {
                    url: API_URLS.SALES_MAKE_NEW,
                    method: 'POST',
                    headers: {
                        ...protectedRoutsAPIHeaderCreator(true),
                        'IdempotentKey': data.IdempotentKey,
                    },
                    body: data.sale,
                }
            ),

            //  invalidatesTags: [ tagTypesOrdersShortList.ordersShortList , tagTypeOrderFullItem.type , tagTypesShortSalesList.shortSalesList ],
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
    useLazyGetSaleReceiptByIdQuery,
    useGetSaleReceiptByIdQuery,
    useMakeSaleMutation,
} = salesApi;
