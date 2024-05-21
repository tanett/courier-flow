import React, { useEffect, useState } from 'react';
import { useAppDispatchT } from 'app/state';
import { useLazyGetExportByIdQuery } from '../../../entities/exports/api/api';
import { exportFileStatuses } from '../../../entities/exports/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { REFETCH_INTERVAL } from 'app/config/api-constants';
import { useLazyExportSalesQuery } from '../../../entities/sales/api/api';
import { typeSearchFilterSales } from '../../../entities/sales/api/types';
import { getSalesFiltersFromUrl } from '../../../entities/sales/helpers/get-sales-filters-from-url';
import { useUrlParams } from 'shared/hooks/use-url-params/use-url-params';

export enum processSteps {
    'preparing' = 'preparing',
    'inQueue' = 'in-queue',
    'inProgress' = 'in-progress',
    'done' = 'done',
    'error' = 'error',
}

export const useExportSales = (salesIds?: string[]) => {

    const dispatchAppT = useAppDispatchT();

    const urlParams = useUrlParams();


    const [ importProcessRange, setImportProcessRange ] = useState<number>(0);

    const [ processStep, setProcessStep ] = React.useState<processSteps>(processSteps.preparing);

    const [ errorInfo, setErrorInfo ] = React.useState<typeResponseError | null>(null);

    const [ exportedFileId, setExportedFileId ] = useState<string | null>(null);
    const [ downloadFileId, setDownloadFileId ] = useState<string | null>(null);
    const [ downloadFileName, setDownloadFileName ] = useState<string | null>(null);

    const [ getExportById ] = useLazyGetExportByIdQuery();

    let filter: typeSearchFilterSales = {};


    if (salesIds) {

        filter.ids = salesIds;

    } else {
        filter = getSalesFiltersFromUrl(urlParams);
    }


    const [ getSalesExport ] = useLazyExportSalesQuery();

    const getData = async () => {

        try {

            const response = await getSalesExport({ filter: filter }).unwrap();

            if (response?.id) setExportedFileId(response.id);
            if (response?.type?.name) setDownloadFileName(response.type.name);

        } catch (error) {

            setProcessStep(processSteps.error);
            setErrorInfo(error as typeResponseError);
            errorHandler(error as typeResponseError, 'export', dispatchAppT);

        }

    };

    useEffect(() => {

        getData();

    }, []);


    // Get import by id handler
    const refetchGetExportById = async (importedFileId: string) => {

        if (importedFileId) {

            try {

                const response = await getExportById(importedFileId).unwrap();

                if (response.status.code === exportFileStatuses.DONE) {

                    setDownloadFileId(importedFileId);
                    setProcessStep(processSteps.done);
                    setImportProcessRange(100);

                }
                if (response.status.code === exportFileStatuses.ERROR) setProcessStep(processSteps.error);

                if (!(response.status.code === exportFileStatuses.IN_QUEUE || response.status.code === exportFileStatuses.RETURNED_TO_QUEUE || response.status.code === exportFileStatuses.IN_PROGRESS)) setExportedFileId(null);

            } catch (err) {

                errorHandler(err as typeResponseError, 'refetchGetExportById', dispatchAppT);

            }

        }

    };


    // Set counter and check exported file
    useEffect(() => {

        let intervalId: NodeJS.Timer | undefined;

        if (exportedFileId) {

            intervalId = setInterval(() => {

                refetchGetExportById(exportedFileId).then();

            }, REFETCH_INTERVAL);

        }

        if (processStep === 'done' || processStep === 'error') clearInterval(intervalId);

        return () => clearInterval(intervalId);

    }, [ exportedFileId ]);

    return {
        downloadFileId,
        downloadFileName,
        processStep,
        importProcessRange,
        errorInfo,
    };

};
