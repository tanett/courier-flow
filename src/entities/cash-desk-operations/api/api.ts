import { baseApi } from 'app/api/base-api';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { typeCashDeskOperation, typeSearchCashDeskOperationsSortingNames, typeSearchFilterCashDeskOperations } from '../model/types';


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
        }),
    }),
});

export const { useSearchCashDeskOperationsQuery } = cashDeskOperationsApi;
