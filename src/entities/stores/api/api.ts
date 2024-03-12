import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protectedRoutsAPIHeaderCreator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeCreateStoreRequest, typeEditStoreRequest, typeSearchFilterStore, typeSearchStoreSortingNames } from 'entities/stores/api/types';
import { typeStore } from 'entities/stores/model/types';

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

                    // cache: 'no-cache',
                    // keepUnusedDataFor: 0,
                }
            ),
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


    }),
});

export const {
    useSearchStoreQuery,
    useLazySearchStoreQuery,
    useGetStoreByIdQuery,
    useLazyGetStoreByIdQuery,
    usePatchStoreMutation,
} = storesApi;
