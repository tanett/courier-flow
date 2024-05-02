
export interface typeDownloadFileButtonsPanelProps {
    isReadyToDownload: boolean
    isFileLoading: boolean
    fileId: string | null
    onDownloadFile: ({id, fileName}:{
        id: string,
        fileName: string
    }) => void
    downloadFileName: string | null
}
