import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { tagTypesOrdersShortList, typeCreateOrderRequest, typeCreateOrderResponse, typeSearchFilterOrders, typeSearchOrdersSortingNames } from './types';
import { typeAddAssigneeForOrder, typeAddCourierForOrder, typeChangeOrderStatus, typeOrder, typeOrderShort, typeOrderShortExtended, typeOrderStatus } from 'entities/orders/model/state-slice/types';


export const ordersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        // Search orders short
        searchOrdersShortExtended: builder.query<typeSearchResponse<typeOrderShortExtended>, typeSearchRequest<typeSearchFilterOrders, typeSearchOrdersSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.ORDERS_SEARCH_EXTENDED,
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
                    ...result.content.map((item: typeOrderShort) => ({ type: tagTypesOrdersShortList.ordersShortList.type, id: item.id.toString() })),
                    tagTypesOrdersShortList.ordersShortList
                ]
                : [ tagTypesOrdersShortList.ordersShortList ],
        }),
        // Search orders short
        searchOrdersShort: builder.query<typeSearchResponse<typeOrderShort>, typeSearchRequest<typeSearchFilterOrders, typeSearchOrdersSortingNames>>({
            query: (data) => (
                {
                    url: API_URLS.ORDERS_SEARCH,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                    cache: 'no-cache',
                }
            ),
        }),

        // create order
        createOrder: builder.mutation<typeCreateOrderResponse, typeCreateOrderRequest>({
            query: (data) => (
                {
                    url: API_URLS.ORDERS_CREATE,
                    method: 'POST',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesOrdersShortList.ordersShortList ],
        }),

        // change status
        changeOrderStatus: builder.mutation<unknown, typeChangeOrderStatus>({
            query: (data) => (
                {
                    url: API_URLS.ORDERS_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesOrdersShortList.ordersShortList  ],
        }),

        // change status in progress
        changeOrderAddAssignee: builder.mutation<unknown, typeAddAssigneeForOrder>({
            query: (data) => (
                {
                    url: API_URLS.ORDERS_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesOrdersShortList.ordersShortList  ],
        }),

        // change status in progress
        changeOrderAddCourier: builder.mutation<unknown, typeAddCourierForOrder>({
            query: (data) => (
                {
                    url: API_URLS.ORDERS_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesOrdersShortList.ordersShortList  ],
        }),

        // get Order by id
        getOrderById: builder.query<typeOrder, string>({
            query: (id) => (
                {
                    url: API_URLS.ORDERS_GET.replace('{id}', id),
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),

        // get list orders statuses
        getOrdersStatusesList: builder.query<typeOrderStatus[], unknown>({
            query: () => (
                {
                    url: API_URLS.ORDERS_GET_STATUSES_LIST,
                    method: 'GET',
                    headers: protectedRoutsAPIHeaderCreator(),
                }
            ),
        }),


    }),
});

export const {
    useSearchOrdersShortQuery,
    useSearchOrdersShortExtendedQuery,
    useLazySearchOrdersShortExtendedQuery,
    useLazySearchOrdersShortQuery,
    useCreateOrderMutation,
    useGetOrderByIdQuery,
    useLazyGetOrderByIdQuery,
    useGetOrdersStatusesListQuery,
    useChangeOrderStatusMutation,
    useChangeOrderAddAssigneeMutation,
    useChangeOrderAddCourierMutation,

} = ordersApi;
