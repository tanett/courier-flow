
export interface typeDownloadFileButtonsPanelProps {
    isReadyToDownload: boolean
    isFileLoading: boolean
    fileId: string | null
    onDownloadFile: (fileId: string) => void
}
