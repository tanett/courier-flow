import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeChangeVatForAll, typeProduct, typeProductAdditionalFieldInfo, typeProductExtended } from '../../../entities/products/model/state-slice/types';
import {
    PRODUCT_IMPORT_CODE,
    tagTypesProductsExtendedList,
    typeBatchEditProductRequest,
    typeCreateProductRequest,
    typeEditProductRequest,
    typeImportResponse,
    typeProductToArchiveRequest,
    typeSearchFilterProduct,
    typeSearchFilterProductExtended,
    typeSearchProductSortingNames,
} from './types';
import { expectedFileType, responseToBlobDownload } from 'shared/utils/response-to-blob-dowload';
import { localeHeaderCreator } from 'app/utils/locale-header-creator';
import { typeExport } from '../../exports/api/types';

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

        // import product to server with file
        importProductFile: builder.mutation<typeImportResponse, FormData>({
            query: (file) => (
                {
                    url: API_URLS.PRODUCTS_IMPORT,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: file,
                }
            ),

        }),

        // download template files for import
        downloadTemplateFile: builder.query<unknown, PRODUCT_IMPORT_CODE>({
            query: (type) => (
                {
                    url: API_URLS.PRODUCTS_DOWNLOAD_TEMPLATE.replace('{type}', type),
                    method: 'GET',
                    headers: {
                        ...protectedRoutsAPIHeaderCreator(),
                        ...localeHeaderCreator(),

                    },
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

        // export product catalog - without stores and prices
        exportProductCatalog: builder.query<typeExport, { filter: typeSearchFilterProductExtended }>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCTS_EXPORT,
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
    useImportProductFileMutation,
    useLazyDownloadTemplateFileQuery,
    useExportProductCatalogQuery,
    useLazyExportProductCatalogQuery,
} = productsApi;
