export type typeCategory = {
    id: string
    createdAt: string
    createdBy: string
    name: string
    merchantId: string
}

export type typeCategoryExtended = typeCategory & {productsCount: number}

export type typeCategoryCreate = Pick<typeCategory, 'name' | 'merchantId'>

export type typeCategoryEdit = {
    id: typeCategory['id'],
    name?: typeCategory['name'], // 250 chars
}

export type typeCategoryToArchive = string[]
