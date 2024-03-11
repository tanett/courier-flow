import React from 'react';
import { dialogIcon } from '../../dialog/types';

export interface typeTablePagination {
    pageNumber: number
    pageSize: number
    totalElements: number
    totalPages: number
    withPerPage?: boolean
}

export enum dialogVariant {
    warning = 'warning',
}

export interface typeTable<T> {
    isLoading?: boolean
    tableDataItems: T[] | null
    tableConfigurator: {
        columns: {
            keyName: string,
            columnTitle: string,
            columnTitleWrapper?: (children: React.ReactNode | string) => React.ReactNode,
            valueWrapper?: (children: React.ReactNode | string) => React.ReactNode,
            emptySymbol?: React.ReactNode
        }[],
        rowAction?: (id: string | number, name?: string) => void,
        columnActions?: {
            title?: string,
            actionList: {
                icon: React.ReactNode,
                handler: (id: string) => void
                title?: string
                withConfirmDialog?: {
                    variant: dialogVariant
                    buttons?: {
                        confirmTitle?: string,
                        cancelTitle?: string,
                    },
                    message: string
                }
            }[]
        }
    }
    pagination?: typeTablePagination
    withPerPage?: boolean
}

export interface typeTableTh extends React.PropsWithChildren {
    withLeftDivider?: boolean,
    align?: 'center' | 'right'
}

export interface typeTableTd extends React.PropsWithChildren {
    align?: 'center' | 'right'
}

export interface typeTableDialog {
    variant: dialogIcon
    message: string
    cancelButton?: { title: string, handler: () => void }
    confirmButton?: { title: string, handler: () => void }
}
