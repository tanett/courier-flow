import React, { useEffect, useState } from 'react';
import { useAppDispatchT } from '../../../app/state';
import { useLazyGetExportByIdQuery } from '../../../entities/exports/api/api';
import { exportFileStatuses } from '../../../entities/exports/api/types';
import { errorHandler } from '../../../app/utils/errorHandler';
import { typeResponseError } from '../../../app/api/types';
import { REFETCH_INTERVAL } from '../../../app/config/api-constants';
import { useLazyExportProductCatalogQuery } from '../../../entities/products/api/api';
import { typeSearchFilterProductExtended } from '../../../entities/products/api/types';
import { PRODUCT_EXPORT_TYPE_REQUEST, typeExportOptions } from 'features/products-export/types/types';
import { useLazyExportRetailProductCatalogQuery } from '../../../entities/retail-products/api/api';
import { typeSearchFilterRetailProduct } from 'entities/retail-products/api/types';

export enum processSteps {
    'preparing' = 'preparing',
    'inQueue' = 'in-queue',
    'inProgress' = 'in-progress',
    'done' = 'done',
    'error' = 'error',
}

export const useExportProducts = (options: typeExportOptions, productIds?: string[]) => {

    const dispatchAppT = useAppDispatchT();

    const [ importProcessRange, setImportProcessRange ] = useState<number>(0);

    const [ processStep, setProcessStep ] = React.useState<processSteps>(processSteps.preparing);

    const [ errorInfo, setErrorInfo ] = React.useState<typeResponseError | null>(null);

    const [ exportedFileId, setExportedFileId ] = useState<string | null>(null);
    const [ downloadFileId, setDownloadFileId ] = useState<string | null>(null);

    const [ getExportById ] = useLazyGetExportByIdQuery();

    const filterCatalog: typeSearchFilterProductExtended = {};
    const filterRetail: typeSearchFilterRetailProduct = {};


    if (options.type === PRODUCT_EXPORT_TYPE_REQUEST.CATALOG) {

        filterCatalog.archived = false;

    }

    if (productIds){

        if (options.type === PRODUCT_EXPORT_TYPE_REQUEST.RETAIL){

            filterRetail.productIds = productIds;

        }
        if (options.type === PRODUCT_EXPORT_TYPE_REQUEST.CATALOG){

            filterCatalog.ids = productIds;

        }

    }

    if (options.stores && options.stores.selectedStores.length > 0) {

        const ids = options.stores.selectedStores.map(item => item.id);
        filterCatalog.storeIds = ids;
        filterRetail.storeIds = ids;

    }

    if (options.stores && options.stores.isAllSelected) {

        filterCatalog.storeIds = [];
        filterRetail.storeIds = [];

    }

    const [ getProductCatalogExport ] = useLazyExportProductCatalogQuery();
    const [ getRetailProductExport ] = useLazyExportRetailProductCatalogQuery();

    const getData = async () => {

        try {

            const response = options.type === PRODUCT_EXPORT_TYPE_REQUEST.CATALOG ? await getProductCatalogExport({ filter: filterCatalog }).unwrap() : await getRetailProductExport({ filter: filterRetail }).unwrap();

            if (response?.id) setExportedFileId(response.id);

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
        processStep,
        importProcessRange,
        errorInfo,
    };

};
