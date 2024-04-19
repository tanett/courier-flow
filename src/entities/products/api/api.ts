import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { PRODUCT_IMPORT_TYPE_FOR_TEMPLATE, typeChangeVatForAll, typeProduct, typeProductAdditionalFieldInfo, typeProductExtended } from '../../../entities/products/model/state-slice/types';
import {
    typeBatchEditProductRequest,
    typeCreateProductRequest,
    typeEditProductRequest,
    typeImportResponse,
    typeProductToArchiveRequest,
    typeSearchFilterProduct,
    typeSearchFilterProductExtended,
    typeSearchProductSortingNames
} from '../../../entities/products/api/types';
import { expectedFileType, responseToBlobDownload } from 'shared/utils/response-to-blob-dowload';
import { localeHeaderCreator } from 'app/utils/locale-header-creator';

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
        }),

        // change vat for all products
        changeVatForALl: builder.mutation<unknown, typeChangeVatForAll>({
            query: (data) => (
                {
                    url: API_URLS.PRODUCT_CHANGE_ALL_VAT,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
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
                    url: API_URLS.PRODUCT_IMPORT,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: file,
                }
            ),
        }),

        // download template files for import
        downloadTemplateFile: builder.query<unknown, PRODUCT_IMPORT_TYPE_FOR_TEMPLATE>({
            query: (type) => (
                {
                    url: API_URLS.PRODUCT_DOWNLOAD_TEMPLATE.replace('{type}', type),
                    method: 'GET',
                    headers: {
                        ...protectedRoutsAPIHeaderCreator(),
                        ...localeHeaderCreator()

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
    useBatchPatchProductMutation,
    useChangeVatForALlMutation,
    useImportProductFileMutation,
    useLazyDownloadTemplateFileQuery,
} = productsApi;
