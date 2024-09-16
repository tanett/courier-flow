import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeCategory, typeCategoryExtended } from '../model/types';
import { typeCreateCategoryRequest, typeEditCategoryRequest, typeSearchFilterCategory, typeSearchCategorySortingNames, typeCategoryDeleteRequest, tagTypesCategoriesExtendedList } from './types';


export const productsCategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search product category
        searchCategory: builder.query<typeSearchResponse<typeCategory>, typeSearchRequest<typeSearchFilterCategory, typeSearchCategorySortingNames>>({
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

        // Extended Search product category
        searchCategoryExtended: builder.query<typeSearchResponse<typeCategoryExtended>, typeSearchRequest<typeSearchFilterCategory, typeSearchCategorySortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.CATEGORIES_SEARCH_EXTENDED,
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
                    ...result.content.map((item: typeCategoryExtended) => ({ type: tagTypesCategoriesExtendedList.categoriesExtendedList.type, id: item.id.toString() })),
                    tagTypesCategoriesExtendedList.categoriesExtendedList
                ]
                : [ tagTypesCategoriesExtendedList.categoriesExtendedList ],
        }),

        // create Product category
        createCategory: builder.mutation<typeCategory, typeCreateCategoryRequest >({
            query: (data) => (
                {
                    url: API_URLS.CATEGORIES_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesCategoriesExtendedList.categoriesExtendedList ],
        }),

        // patch Product Category
        patchCategory: builder.mutation<typeCategory, typeEditCategoryRequest >({
            query: (data) => (
                {
                    url: API_URLS.CATEGORIES_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesCategoriesExtendedList.categoriesExtendedList ],
        }),

        // Category  delete
        categoryDelete: builder.mutation<typeCategory, typeCategoryDeleteRequest >({
            query: (data) => (
                {
                    url: API_URLS.CATEGORIES_DELETE,
                    method: 'DELETE',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesCategoriesExtendedList.categoriesExtendedList ],
        }),

        // get Category by id
        getCategoryById: builder.query({
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
    useGetCategoryByIdQuery,
    useLazyGetCategoryByIdQuery,
    usePatchCategoryMutation,
    useLazySearchCategoryQuery,
    useSearchCategoryExtendedQuery,
    useLazySearchCategoryExtendedQuery,
    useCreateCategoryMutation,
    useSearchCategoryQuery,
    useCategoryDeleteMutation,
} = productsCategoryApi;
