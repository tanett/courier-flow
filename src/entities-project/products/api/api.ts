import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeChangeVatForAll, typeProduct, typeProductAdditionalFieldInfo, typeProductExtended } from '../../products/model/state-slice/types';
import {
    tagTypesProductsExtendedList,
    typeBatchEditProductRequest,
    typeCreateProductRequest,
    typeEditProductRequest,
    typeProductToArchiveRequest,
    typeSearchFilterProduct,
    typeSearchFilterProductExtended,
    typeSearchProductSortingNames,
} from './types';


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
        searchProductExtended: builder.query<typeSearchResponse<typeProductExtended>, typeSearchRequest<typeSearchFilterProductExtended, typeSearchProductSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeProductExtended) => ({ type: tagTypesProductsExtendedList.productsExtendedList.type, id: item.id.toString() })),
                    tagTypesProductsExtendedList.productsExtendedList
                ]
                : [ tagTypesProductsExtendedList.productsExtendedList ],
        }),

        // create Product
        createProduct: builder.mutation<typeProduct, typeCreateProductRequest>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesProductsExtendedList.productsExtendedList ],
        }),

        // patch Product
        patchProduct: builder.mutation<typeProduct, typeEditProductRequest>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesProductsExtendedList.productsExtendedList ],
        }),

        // batch patch Product
        batchPatchProduct: builder.mutation<unknown, typeBatchEditProductRequest>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_PATCH_BATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesProductsExtendedList.productsExtendedList ],
        }),

        // change vat for all products
        changeVatForALl: builder.mutation<unknown, typeChangeVatForAll>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_CHANGE_ALL_VAT,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesProductsExtendedList.productsExtendedList ],
        }),

        // Product to archive
        productToArchive: builder.mutation<typeProduct, typeProductToArchiveRequest>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_ARCHIVE,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesProductsExtendedList.productsExtendedList ],
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
    useSearchProductQuery,
    useLazySearchProductExtendedQuery,
    useSearchProductExtendedQuery,
    useCreateProductMutation,
    useProductToArchiveMutation,
    useBatchPatchProductMutation,
    useChangeVatForALlMutation,

} = productsApi;
