export type typeImportError = {
    errorCode: string
    errorMessage: string
    invalidValue: {
        description: string
    } | string
    rowNumber?: number
}

export enum importFileStatuses {
    RETURNED_TO_QUEUE = 'returned-to-queue',
    ERROR = 'error',
    CANCELED = 'cancelled',
    DONE = 'done',
    IN_PROGRESS = 'in-progress',
    IN_QUEUE = 'in-queue',
}

export interface typeImportFileStatus {
    code: importFileStatuses
    name: string
}

export interface typeImportFileType {
    code: string
    name: string
    fileFormat: 'DOC' | 'DOCX' | 'PDF' | 'XLS' | 'XLSX' | 'TXT' | 'CSV' | 'JSON' | 'XML'
    withProgressBar: boolean
    timeoutInMinutes: number
}


export interface typeImport {
    id: string
    createdAt: string
    createdBy: string
    type: typeImportFileType
    status: typeImportFileStatus
    progressBarPercent: number
    withProgressBar: boolean
    retryAttempt: number
    errors: typeImportError[]
    unexpectedExceptionStackTrace: string
    locale: string
    fileRemoved: boolean
    fileName: string
}

export interface typeImportErrorResponse {
    id: string;
    createdAt: string;
    createdBy: string;
    type: typeImportFileType;
    status: typeImportFileStatus;
    progressBarPercent: number;
    withProgressBar: boolean;
    retryAttempt: number;
    errors: typeImportError[];
    locale: string;
}

export interface typeSearchImportFilter {
    ids?: string[]
    typeCodes?: string[]
    fileRemoved?: boolean
    _or_?:  Omit<typeSearchImportFilter, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchImportFilter, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchImportSortingNames = 'CREATED_AT';
