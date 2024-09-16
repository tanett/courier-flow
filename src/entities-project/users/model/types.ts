import { typeUser } from 'entities-project/user-profile/model/state-slice';

export type typeUsersCreate = Pick<typeUser, 'fullName' | 'email' | 'temporaryPassword' | 'merchantId'> & Partial<Pick<typeUser, 'phone' | 'storeIds'>> & { roleId: string }

export type typeUsersEdit = Partial<Omit<typeUsersCreate, 'phone' | 'storeIds'>> & {
    id: string,
    phone?: string | null,
    storeIds?: {
        values: string[],
        patchType: 'REPLACE' | 'ADD' | 'REMOVE'
    }
}

export type typeUserToArchive = string[]

export type typeUserWithStoresName = Omit<typeUser, 'storeIds'> & { stores: {
        id: string,
        name:string,
    }[]}
