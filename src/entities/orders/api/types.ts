import { typeChangeOrderData, typeOrderCreate } from '../model/state-slice/types';
import { OrderStatuses } from '../model/orders-statuses';

export const tagTypesOrdersShortList = { ordersShortList: { type: 'OrdersShortList' as const, id: 'PARTIAL-LIST' } } as const;

export const tagTypeOrderFullItem =  { type: 'OrdersFullItem' }

export type typeCreateOrderRequest = typeOrderCreate

export type typeCreateOrderResponse = {id: string};

export type typeEditOrderRequest = typeChangeOrderData



export type typeSearchFilterOrders = {
    ids?: string[]
    searchText?: string
    storeIds?: string[]
    codes?: string[]
    assigneeIds?: string[]
    courierIds?: string[]
    createdByIds?: string[]
    orderedAtFrom?: string
    orderedAtTo?: string
    hasDeclinedProducts?: boolean
    statuses?: OrderStatuses[]
    isTest?: boolean
    _or_?:  Omit<typeSearchFilterOrders, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterOrders, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchOrdersSortingNames = 'ORDERED_AT';
