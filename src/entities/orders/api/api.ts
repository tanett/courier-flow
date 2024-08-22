import { baseApi } from 'app/api/base-api';
import { typeSearchRequest, typeSearchResponse } from 'app/api/types';
import { API_URLS } from 'app/config/api-urls';
import { protectedRoutsAPIHeaderCreator } from 'app/utils/protected-routs-API-header-creator';
import { tagTypeOrderFullItem, tagTypesOrdersShortList, typeCreateOrderRequest, typeCreateOrderResponse, typeEditOrderRequest, typeSearchFilterOrders, typeSearchOrdersSortingNames } from './types';
import { typeAddCourierForOrder, typeChangeOrderStatus, typeOrder, typeOrderShort, typeOrderShortExtended, typeOrderStatus } from '../model/state-slice/types';
import { localeHeaderCreator } from 'app/utils/locale-header-creator';


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
            invalidatesTags: [ tagTypesOrdersShortList.ordersShortList , tagTypeOrderFullItem.type  ],
        }),

        // // change status in progress
        // changeOrderAddAssignee: builder.mutation<unknown, typeAddAssigneeForOrder>({
        //     query: (data) => (
        //         {
        //             url: API_URLS.ORDERS_PATCH,
        //             method: 'PATCH',
        //             headers: protectedRoutsAPIHeaderCreator(),
        //             body: data,
        //         }
        //     ),
        //     invalidatesTags: [ tagTypesOrdersShortList.ordersShortList , tagTypeOrderFullItem.type  ],
        // }),

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
            invalidatesTags: [ tagTypesOrdersShortList.ordersShortList , tagTypeOrderFullItem.type  ],
        }),


        // change order data - customer, products ...
        changeOrderData: builder.mutation<unknown, typeEditOrderRequest>({
            query: (data) => (
                {
                    url: API_URLS.ORDERS_PATCH,
                    method: 'PATCH',
                    headers: protectedRoutsAPIHeaderCreator(),
                    body: data,
                }
            ),
            invalidatesTags: [ tagTypesOrdersShortList.ordersShortList , tagTypeOrderFullItem.type  ],
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
            providesTags:  [ tagTypeOrderFullItem.type ],
        }),

        // get list orders statuses
        getOrdersStatusesList: builder.query<typeOrderStatus[], unknown>({
            query: () => (
                {
                    url: API_URLS.ORDERS_GET_STATUSES_LIST,
                    method: 'GET',
                    headers: {
                        ...protectedRoutsAPIHeaderCreator(),
                        ...localeHeaderCreator(),
                    },
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
    // useChangeOrderAddAssigneeMutation,
    useChangeOrderAddCourierMutation,
useChangeOrderDataMutation,

} = ordersApi;
