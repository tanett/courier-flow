import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import {
    typeCashDesk, typeSearchCashDeskSortingNames,
    typeSearchFilterCashDesk,
} from '../model/types';


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

            // invalidatesTags: [ tagTypesExtendedUsersList.extendedUsersList ],
        }),
    }),
});

export const {
    useSearchCashDeskQuery,
    useLazySearchCashDeskQuery,
    useGetCashDeskByIdQuery,
    useCashDeskToArchiveMutation,
} = cashDeskApi;
