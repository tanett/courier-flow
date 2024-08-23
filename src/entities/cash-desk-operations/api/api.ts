import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import {
    tagTypesCashDeskOperationList,
    typeCashDeskOperation, typeCreateCashDeskOperationData,
    typeSearchCashDeskOperationsSortingNames,
    typeSearchFilterCashDeskOperations,
} from '../model/types';


export const cashDeskOperationsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search Cash Desk Operations
        searchCashDeskOperations: builder.query<typeSearchResponse<typeCashDeskOperation>, typeSearchRequest<typeSearchFilterCashDeskOperations, typeSearchCashDeskOperationsSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.CASH_DESK_OPERATIONS_SEARCH,
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
                    ...result.content.map((item: typeCashDeskOperation) => ({ type: tagTypesCashDeskOperationList.cashDeskOperationList.type, id: item.id.toString() })),
                    tagTypesCashDeskOperationList.cashDeskOperationList
                ]
                : [ tagTypesCashDeskOperationList.cashDeskOperationList ],
        }),

        // Create operation
        createCashDeskOperation: builder.mutation<typeCashDeskOperation, typeCreateCashDeskOperationData>({
            query: (data) => (
                {
                    url: API_URLS.CASH_DESK_OPERATIONS_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [
                tagTypesCashDeskOperationList.cashDeskOperationList
            ],
        }),
    }),
});

export const {
    useSearchCashDeskOperationsQuery,
    useCreateCashDeskOperationMutation,
} = cashDeskOperationsApi;
