import { sortDirection } from '../../../app/api/types';
import { useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { REFETCH_INTERVAL } from '../../../app/config/api-constants';
import { useGetImportProductsListQuery } from '../../../entities/imports/api/api';
import { importFileStatuses } from '../../../entities/imports/api/types';
import { PRODUCT_IMPORT_CODE } from '../../../entities/products/api/types';
import { PRODUCT_IMPORT_CATALOG_CODE, RETAIL_PRODUCT_EXCEL_IMPORT_CODE, RETAIL_PRODUCT_FILTER_IMPORT_CODE } from 'app/config/export-import-codes';

export const useImportsProductsList = () => {

    const [ trigger, setTrigger ] = useState(true);

    const interval = useInterval(() => {

        setTrigger((prev) => !prev);
        refetch();

    }, REFETCH_INTERVAL * 2);

    const { data, isLoading, refetch } = useGetImportProductsListQuery({
        filter: {
            typeCodes: [ PRODUCT_IMPORT_CATALOG_CODE, RETAIL_PRODUCT_EXCEL_IMPORT_CODE, RETAIL_PRODUCT_FILTER_IMPORT_CODE ],
            fileRemoved: false,
        },
        pagination: {
            pageNumber: 0,
            pageSize: 20,
        },
        sorts: [
            {
                sort: 'CREATED_AT',
                direction: sortDirection.dec,
            }
        ],
    });


    useEffect(() => {

        interval.start();
        return interval.stop;

    }, []);

    useEffect(() => {

        if (data?.content && !data?.content.find(item => item.status.code === importFileStatuses.IN_PROGRESS
            || item.status.code === importFileStatuses.IN_QUEUE
            || item.status.code === importFileStatuses.RETURNED_TO_QUEUE)) interval.stop();

    }, [ trigger ]);

    return {
        importList: data?.content ?? null,
        isLoadingImportList: isLoading,
    };

};
