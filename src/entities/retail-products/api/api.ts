import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeRetailProduct } from '../../../entities/retail-products/model/types';
import {
    typeChangePricesInAllStoresRequest,
    typeCreateRetailProductRequest,
    typeEditRetailProductRequest,
    typeRetailProductDeleteRequest,
    typeSearchFilterRetailProduct,
    typeSearchRetailProductSortingNames,
} from '../../../entities/retail-products/api/types';
import { localeHeaderCreator } from 'app/utils/locale-header-creator';
import { typeExport } from '../../../entities/exports/api/types';
import { typeSearchFilterProductExtended } from '../../../entities/products/api/types';

export const retailProductsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search retail product
        searchRetailProduct: builder.query<typeSearchResponse<typeRetailProduct>, typeSearchRequest<typeSearchFilterRetailProduct, typeSearchRetailProductSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.RETAIL_PRODUCTS_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),

        // create retail Product
        createRetailProduct: builder.mutation<typeRetailProduct, typeCreateRetailProductRequest >({
            query: (data) => (
                {
                    url: API_URLS.RETAIL_PRODUCTS_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // patch retail Product
        patchRetailProduct: builder.mutation<typeRetailProduct, typeEditRetailProductRequest >({
            query: (data) => (
                {
                    url: API_URLS.RETAIL_PRODUCTS_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // delete retail product
        deleteRetailProduct: builder.mutation<typeRetailProduct, typeRetailProductDeleteRequest >({
            query: (data) => (
                {
                    url: API_URLS.RETAIL_PRODUCTS_DELETE,
                    method: 'DELETE',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // get retail Product by id
        getRetailProductById: builder.query<typeRetailProduct, string>({
            query: (id) => (
                {
                    url: API_URLS.RETAIL_PRODUCTS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        // change prices in all stores retail Product
        changePricesInAllStores: builder.mutation<typeRetailProduct, typeChangePricesInAllStoresRequest >({
            query: (data) => (
                {
                    url: API_URLS.RETAIL_PRODUCTS_CHANGE_PRICES_IN_ALL_STORES,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // export product catalog - with stores and prices
        exportRetailProductCatalog: builder.query<typeExport, { filter: typeSearchFilterProductExtended }>({
            query: (data) => (
                {
                    url: API_URLS.RETAIL_PRODUCTS_EXPORT,
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
    }),
});

export const {
    useCreateRetailProductMutation,
    usePatchRetailProductMutation,
    useSearchRetailProductQuery,
    useLazySearchRetailProductQuery,
    useDeleteRetailProductMutation,
    useGetRetailProductByIdQuery,
    useChangePricesInAllStoresMutation,
    useExportRetailProductCatalogQuery,
    useLazyExportRetailProductCatalogQuery,
} = retailProductsApi;
