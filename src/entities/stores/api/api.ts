import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { tagTypesExtendedStoresList, typeEditStoreRequest, typeSearchFilterStore, typeSearchStoreSortingNames, typeStoreToArchiveRequest } from './types';
import { typeExtendedStore, typeStore } from '../model/types';



export const storesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search store
        searchStore: builder.query<typeSearchResponse<typeStore>, typeSearchRequest<typeSearchFilterStore, typeSearchStoreSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.STORES_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
        }),

        // extended Search store with users count
        extendedSearchStore: builder.query<typeSearchResponse<typeExtendedStore>, typeSearchRequest<typeSearchFilterStore, typeSearchStoreSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.STORES_SEARCH_EXTENDED,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,

                }
            ),
            providesTags: (result) => result
                ? [

                    // Provides a tag for each group in the current page,
                    // as well as the 'PARTIAL-LIST' tag.
                    ...result.content.map((item: typeExtendedStore) => ({ type: tagTypesExtendedStoresList.storesExtendedList.type, id: item.id.toString() })),
                    tagTypesExtendedStoresList.storesExtendedList
                ]
                : [ tagTypesExtendedStoresList.storesExtendedList ],
        }),


        // patch store
        patchStore: builder.mutation<typeStore, typeEditStoreRequest >({
            query: (data) => (
                {
                    url: API_URLS.STORES_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [tagTypesExtendedStoresList.storesExtendedList]
        }),


        // get store by id
        getStoreById: builder.query<typeStore, string>({
            query: (id) => (
                {
                    url: API_URLS.STORES_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),


        // store to archive
        storeToArchive: builder.mutation<typeStore, typeStoreToArchiveRequest >({
            query: (data) => (
                {
                    url: API_URLS.STORES_ARCHIVE,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [tagTypesExtendedStoresList.storesExtendedList]
        }),
    }),
});

export const {
    useSearchStoreQuery,
    useExtendedSearchStoreQuery,
    useLazyExtendedSearchStoreQuery,
    useLazySearchStoreQuery,
    useGetStoreByIdQuery,
    useLazyGetStoreByIdQuery,
    usePatchStoreMutation,
    useStoreToArchiveMutation,
} = storesApi;
