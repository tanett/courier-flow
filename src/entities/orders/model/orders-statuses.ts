export enum OrderStatuses {
    CREATED = 'CREATED',
    PROCESSING = 'PROCESSING',
    WAITING_FOR_DELIVERY = 'WAITING_FOR_DELIVERY',
    DELIVERING = 'DELIVERING',
    CANCELLED = 'CANCELLED',
    COMPLETED = 'COMPLETED'
}


export const OrderStatusAvailableForEdit=[OrderStatuses.CREATED, OrderStatuses.PROCESSING,OrderStatuses.WAITING_FOR_DELIVERY]
