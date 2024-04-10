import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protectedRoutsAPIHeaderCreator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeProduct, typeProductAdditionalFieldInfo, typeProductExtended } from '../../../entities/products/model/state-slice/types';
import { typeCreateProductRequest, typeEditProductRequest, typeProductToArchiveRequest, typeSearchFilterProduct, typeSearchProductSortingNames } from '../../../entities/products/api/types';

export const productsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search product
        searchProduct: builder.query<typeSearchResponse<typeProduct>, typeSearchRequest<typeSearchFilterProduct, typeSearchProductSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),
// Search product extended with counters
        searchProductExtended: builder.query<typeSearchResponse<typeProductExtended>, typeSearchRequest<typeSearchFilterProduct, typeSearchProductSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),
        // create Product
        createProduct: builder.mutation<typeProduct, typeCreateProductRequest >({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // patch Product
        patchProduct: builder.mutation<typeProduct, typeEditProductRequest >({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // Product to archive
        ProductToArchive: builder.mutation<typeProduct, typeProductToArchiveRequest >({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_ARCHIVE,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // get Product by id
        getProductById: builder.query<typeProduct, string>({
            query: (id) => (
                {
                    url: API_URLS.PRODUCTS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        // get additional field info
        getAdditionalFieldInfo: builder.query<typeProductAdditionalFieldInfo[], unknown>({
            query: () => (
                {
                    url: API_URLS.PRODUCTS_ADDITIONAL_FIELD_INFO_GET,
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

    }),
});

export const {
    useGetProductByIdQuery,
    useLazyGetProductByIdQuery,
    usePatchProductMutation,
    useLazySearchProductQuery,
    useLazySearchProductExtendedQuery,
    useSearchProductExtendedQuery,
    useCreateProductMutation,
    useProductToArchiveMutation,
} = productsApi;
