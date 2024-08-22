import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import {
    typeCashDesk, typeCashDeskCreate, typeCashDeskEdit, typeSearchCashDeskSortingNames,
    typeSearchFilterCashDesk,
} from '../model/types';
import { tagTypesCashDeskList } from './types';


export const cashDeskApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search CashDesk
        searchCashDesk: builder.query<typeSearchResponse<typeCashDesk>, typeSearchRequest<typeSearchFilterCashDesk, typeSearchCashDeskSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.CASH_DESK_SEARCH,
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
                    ...result.content.map((item: typeCashDesk) => ({ type: tagTypesCashDeskList.cashDeskList.type, id: item.id.toString() })),
                    tagTypesCashDeskList.cashDeskList
                ]
                : [ tagTypesCashDeskList.cashDeskList ],
        }),

        // Get cash desk by id
        getCashDeskById: builder.query<typeCashDesk, string>({
            query: (id) => (
                {
                    url: API_URLS.CASH_DESK_BY_ID.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        // Cash desk to archive
        cashDeskToArchive: builder.mutation<typeCashDesk, string[] >({
            query: (data) => (
                {
                    url: API_URLS.CASH_DESK_ARCHIVE,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),

            invalidatesTags: [ tagTypesCashDeskList.cashDeskList ],
        }),

        // create cash desk
        createCashDesk: builder.mutation<typeCashDesk, typeCashDeskCreate >({
            query: (data) => (
                {
                    url: API_URLS.CASH_DESK_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesCashDeskList.cashDeskList ],
        }),

        // patch cash desk
        patchCashDesk :builder.mutation<typeCashDesk, typeCashDeskEdit >({
            query: (data) => (
                {
                    url: API_URLS.CASH_DESK_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesCashDeskList.cashDeskList ],
        }),
    }),
});

export const {
    useSearchCashDeskQuery,
    useLazySearchCashDeskQuery,
    useGetCashDeskByIdQuery,
    useCashDeskToArchiveMutation,
    useCreateCashDeskMutation,
    usePatchCashDeskMutation,
} = cashDeskApi;
