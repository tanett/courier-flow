export type typeStoreType = 'MEDICINE' | 'FUEL' | 'FASHION' | 'OTHER'

export enum STORE_TYPE {
    MEDICINE = 'MEDICINE',
    FUEL = 'FUEL',
    FASHION = 'FASHION',
    OTHER = 'OTHER'
}

export type typeStoreCreate = {
    name: string,
    address: string,
    locality: string,
    phoneNumber?: string,
    email?: string,
    merchantId: string,
    description?: string,
    type: STORE_TYPE
}

export type typeStoreEdit = Partial<Omit<typeStoreCreate, 'phoneNumber' | 'email' | 'description'>> & { id: string, phoneNumber?: string | null, email?: string | null, description?: string | null, }

export type typeStore = typeStoreCreate & {
    id: string,
    createdAt: string,
    createdBy: string,
    archived: boolean,
    archivedAt: string,
    archivedBy: string,
    merchantId: string,
}

export type typeExtendedStore = typeStore & {usersCount: number}

export type typeStoreToArchive = typeStore['id'][]
