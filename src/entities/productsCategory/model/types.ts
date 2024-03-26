export type typeProductCategory = {
    id: string
    createdAt: string
    createdBy: string
    name: string
    merchantId: string
}


export type typeProductCategoryCreate = Pick<typeProductCategory, 'name' | 'merchantId'>

export type typeProductCategoryEdit = {
    id: typeProductCategory['id'],
    name?: typeProductCategory['name'],
}

export type typeProductCategoryToArchive = string[]

