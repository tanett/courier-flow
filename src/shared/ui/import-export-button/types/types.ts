export interface typeImportExportButtonProps {
    variant: 'loader' | 'download' | 'error' | 'cancelled' | 'done'
    handler?: () => void
    inProcessHandler?: boolean
}
