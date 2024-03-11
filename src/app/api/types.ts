export interface typeResponseError {
    status: number,
    originalStatus: number,
    data: {
        errorCode: string,
        errorMessage: string,
        validationErrors?:typeValidationError[]
    } | string | undefined
}

export type typeValidationError = {
    fieldName: string,
    fieldPath: string,
    invalidValue: Record<string, string>,
    errorCode: string,
    errorMessage: string,
}

// Common types

export interface typeResponsePagination {
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
}
export interface typeSearchResponse<T> extends typeResponsePagination {
    content: T[]
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
}

export interface typeSearchRequest<F, S> {
    filter: F,
    pagination?: {
        pageNumber: number,
        pageSize: number
    },
    sorts?: {
        sort: S,
        direction: sortDirection
    }[]
}

export interface typeUserSettings {
    locale?: 'en' | 'ru';
}

export enum sortDirection {
    asc = 'ASC',
    dec = 'DESC'
}

export interface typeApiTag {
    type: string,
    id?: string|number
}
