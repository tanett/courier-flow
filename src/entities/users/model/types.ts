
export type typeUsersCreate = {
    fullName: string,
    roleId: string,
    email: string,
    phone?: string,
    temporaryPassword: boolean,
    merchantId?: string
}

export type typeUsersEdit = Partial<Omit<typeUsersCreate, 'phone'>> & {id: string, phone?: string | null,}

export type typeUserToArchive = string[]
