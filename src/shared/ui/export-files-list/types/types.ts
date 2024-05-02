import { typeExport } from '../../../../entities/exports/api/types';

export interface typeExportFilesListProps {
    dataList: typeExport[]
    onDownloadFile: ({id, fileName}:{
        id: string,
        fileName: string
    }) => void
    isDownloadingFile?: boolean
}
