import { typeExport } from '../../../../entities/exports/api/types';

export interface typeExportFilesListProps {
    dataList: typeExport[]
    onDownloadFile: (fileId: string) => void
    isDownloadingFile?: boolean
}
