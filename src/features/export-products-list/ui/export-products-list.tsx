import React from 'react';
import { useExportsProductsList } from 'features/export-products-list/hooks/use-exports-products-list';
import { EmptyFileList } from '../../../shared/ui/empy-export-import-list';
import { ExportListSkeleton } from './export-list-skeleton';
import { ExportFilesList } from '../../../shared/ui/export-files-list';
import { useLazyDownloadExportFileByIdQuery } from '../../../entities/exports/api/api';
export const ExportProductsList: React.FC = () => {

    const [ onDownloadFile, { isFetching: isFileDownloadLoading } ] = useLazyDownloadExportFileByIdQuery();

    const {
        exportList,
        isLoadingExportList,
    } = useExportsProductsList();

    if (isLoadingExportList) {

        return <ExportListSkeleton/>;

    } else {

        return (
            exportList?.length
                ? <ExportFilesList onDownloadFile={onDownloadFile} isDownloadingFile={isFileDownloadLoading} dataList={exportList}/>
                : <EmptyFileList/>
        );

    }

};
