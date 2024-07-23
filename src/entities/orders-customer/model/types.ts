export type typeOrdersCustomer = {
    id: string
    createdAt: string
    createdBy: string
    archived: boolean
    archivedAt: string
    archivedBy: string
    fullName: string
    phone: string
    email: string
    merchantId: string
    addresses: typeCustomerAddress[]
}

export type typeCustomerAddress = {
    id: string
    createdAt: string
    createdBy: string
    address: string
    additionalInfo: string
}
