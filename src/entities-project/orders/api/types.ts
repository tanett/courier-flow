import { typeChangeOrderData, typeCreateOrderProduct, typeEditOrder, typeOrderCreate } from '../model/state-slice/types';
import { OrderStatuses } from '../model/orders-statuses';

export const tagTypesOrdersShortList = {
    ordersShortList: {
        type: 'OrdersShortList' as const,
        id: 'PARTIAL-LIST'
    }
} as const;

export const tagTypeOrderFullItem = { type: 'OrdersFullItem' };

export type typeCreateOrderRequest = typeOrderCreate

export type typeCreateOrderResponse = { id: string };

export type typeEditOrderRequest = typeChangeOrderData

export type typePatchOrderForSaleRequest = typeEditOrder & {
    status: OrderStatuses.COMPLETED
    servicePaymentPercent: number
    servicePaymentAmount?: number
}

export type typePatchOrderForSaleWithEditProductsList = {
    id: string
    currentStatus: string
    status: OrderStatuses.COMPLETED
    servicePaymentPercent: number
    servicePaymentAmount?: number
    productsToPatch: typeProductToPatch []
}

export type typeProductToPatch = {
    id: string
    discountPercent: number
    discountAmount?: number
    markedLabels?: typePatchString
    declinedMarkedLabels?: typePatchString
    quantity: number
    declinedQuantity: number
}

type typePatchString = {
    values: string[]
    patchType: 'REPLACE' | 'ADD' | 'REMOVE'
}

export type typeSearchFilterOrders = {
    ids?: string[]
    searchText?: string
    storeIds?: string[]
    codes?: string[]
    collectorIds?: string[]
    courierIds?: string[]
    createdByIds?: string[]
    orderedAtFrom?: string
    orderedAtTo?: string
    hasDeclinedProducts?: boolean
    statuses?: OrderStatuses[]
    isTest?: boolean
    _or_?: Omit<typeSearchFilterOrders, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchFilterOrders, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchOrdersSortingNames = 'ORDERED_AT';
