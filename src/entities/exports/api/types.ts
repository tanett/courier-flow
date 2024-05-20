export type typeExportError = {
    errorCode: string
    errorMessage: string
    invalidValue: {
        description: string
    }
    rowNumber: number
}

export enum exportFileStatuses {
    RETURNED_TO_QUEUE = 'returned-to-queue',
    ERROR = 'error',
    CANCELED = 'cancelled',
    DONE = 'done',
    IN_PROGRESS = 'in-progress',
    IN_QUEUE = 'in-queue',
}

export interface typeExportFileStatus {
    code: exportFileStatuses
    name: string
}

export interface typeExportFileType {
    code: string
    name: string
    fileFormat: 'DOC' | 'DOCX' | 'PDF' | 'XLS' | 'XLSX' | 'TXT' | 'CSV' | 'JSON' | 'XML'
    withProgressBar: boolean
    timeoutInMinutes: number
}

export interface typeExport {
    id: string
    createdAt: string
    createdBy: string
    type: typeExportFileType
    status: typeExportFileStatus
    progressBarPercent: number
    retryAttempt: number
    errorCode: string
    errorMessage: string
    unexpectedExceptionStackTrace: string
    fileRemoved: boolean
    locale: string
}

export interface typeSearchExportFilter {
    ids?: string[]
    typeCodes?: string[]
    fileRemoved?: boolean
    _or_?:  Omit<typeSearchExportFilter, '_or_' | '_not_' | '_and_'>[]
    _not_?: string
    _and_?: Omit<typeSearchExportFilter, '_or_' | '_not_' | '_and_'>[]
}

export type typeSearchExportSortingNames = 'CREATED_AT';
