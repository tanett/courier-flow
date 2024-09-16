import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { typeSearchFilterOrdersCustomer, typeSearchOrdersCustomerSortingNames } from './types';
import { typeOrdersCustomer } from '../model/types';


export const ordersCustomerApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        // Search orders customer
        searchOrdersCustomer: builder.query<typeSearchResponse<typeOrdersCustomer>, typeSearchRequest<typeSearchFilterOrdersCustomer, typeSearchOrdersCustomerSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.ORDERS_CUSTOMER_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),

    }),
});

export const {
    useSearchOrdersCustomerQuery,
    useLazySearchOrdersCustomerQuery,
} = ordersCustomerApi;
