import { OrderStatuses } from 'entities/orders/model/orders-statuses';

export type typeOrder = {
    id: string
    createdAt: string
    createdBy: string
    code: string
    orderedAt: string
    merchantId: string
    storeId: string
    status: string
    assigneeId: string
    courierId: string
    customer: typeOrderCustomer
    deliveryAddress: typeOrderDeliveryAddress
    servicePaymentPercent: number
    servicePaymentAmount: number
    totalDiscountAmount: number
    totalVatAmount: number
    totalCost: number
    isTest: boolean
    products: typeOrderProduct[]
    productsCount: number
}

export type typeOrderProduct = {
    id: string
    createdAt: string
    createdBy: string
    name: string
    categoryId?: string
    unit: string
    barcodes?: string[]
    markedLabels?: string[]
    declinedMarkedLabels: string[]
    priceInStore: number
    quantity?: number
    declinedQuantity?: number
    discountPercent?: number
    discountAmount?: number
    totalCost?: number
    vatPercent: number
    vatAmount: number
    additionalFields: Record<string, string>
}

export type typeOrderCustomer = {
    fullName: string
    phone: string
    email?: string
}

export type typeOrderDeliveryAddress = {
    address: string
    additionalInfo?: string
}

export type typeOrderShort = Omit<typeOrder, 'products'> & {
    hasDeclinedProducts: boolean
    test: boolean
}

export type typeOrderShortExtended = typeOrderShort & {
    storeName: string,
    assigneeName: string,
    courierName: string,
}

export type typeOrderStatus = {
    code: string
    name: string
}

export type typeCreateOrderProduct = Omit<typeOrderProduct, 'createdAt' | 'createdBy' | 'declinedMarkedLabels' | 'declinedQuantity'>

export type typeOrderCreate = {
    orderedAt: string
    storeId: string
    customer: typeOrderCustomer
    deliveryAddress: typeOrderDeliveryAddress
    servicePaymentPercent?: number
    servicePaymentAmount?: number
    products: typeCreateOrderProduct[]
}

export type typeEditOrder = {
    id: string
    currentStatus: string
}

export type typeChangeOrderStatus = typeEditOrder & {status: OrderStatuses}

export type typeAddAssigneeForOrder = typeEditOrder & { assigneeId: string}

export type typeAddCourierForOrder = typeEditOrder & { courierId: string, status?: OrderStatuses.WAITING_FOR_DELIVERY}


export interface typeOrdersState {
    statuses?: typeOrderStatus[];
}
