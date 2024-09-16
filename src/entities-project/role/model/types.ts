import { accessScope } from 'app/config/api-constants';

export type typeRole = {
    id: string
    createdAt: Date
    createdBy: Date
    name: string
    code: string
    defaultRole: boolean
    clientRole: boolean
    accessScope: accessScope
    merchantId: string
}

export type typeRolesExtended = typeRole & {
    usersCount: number,
    description: string
}
