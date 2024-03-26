import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protectedRoutsAPIHeaderCreator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeProductCategory } from '../model/types';
import { typeCreateProductCategoryRequest, typeEditProductCategoryRequest, typeProductCategoryToArchiveRequest, typeSearchFilterProductCategory, typeSearchProductCategorySortingNames } from './types';

export const productsCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search product category
        searchProductCategory: builder.query<typeSearchResponse<typeProductCategory>, typeSearchRequest<typeSearchFilterProductCategory, typeSearchProductCategorySortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.CATEGORIES_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),

        // create Product category
        createProductCategory: builder.mutation<typeProductCategory, typeCreateProductCategoryRequest >({
            query: (data) => (
                {
                    url: API_URLS.CATEGORIES_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // patch Product Category
        patchProductCategory: builder.mutation<typeProductCategory, typeEditProductCategoryRequest >({
            query: (data) => (
                {
                    url: API_URLS.CATEGORIES_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // Category  to archive
        categoryToArchive: builder.mutation<typeProductCategory, typeProductCategoryToArchiveRequest >({
            query: (data) => (
                {
                    url: API_URLS.CATEGORIES_ARCHIVE,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // get Category by id
        getProductCategoryById: builder.query({
            query: (id) => (
                {
                    url: API_URLS.CATEGORIES_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),


    }),
});

export const {
    useGetProductCategoryByIdQuery,
    useLazyGetProductCategoryByIdQuery,
    usePatchProductCategoryMutation,
    useLazySearchProductCategoryQuery,
    useCreateProductCategoryMutation,
    useSearchProductCategoryQuery,
    useCategoryToArchiveMutation
} =productsCategoryApi;
