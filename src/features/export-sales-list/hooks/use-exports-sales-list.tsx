import { useGetExportProductsListQuery } from '../../../entities/exports/api/api';
import { sortDirection } from '../../../app/api/types';
import { useEffect, useState } from 'react';
import { useInterval } from '@mantine/hooks';
import { REFETCH_INTERVAL } from '../../../app/config/api-constants';
import { exportFileStatuses } from '../../../entities/exports/api/types';
import { EXPORT_SALES } from 'app/config/export-import-codes';

export const useExportsSalesList = () => {

    const [ trigger, setTrigger ] = useState(true);

    const interval = useInterval(() => {

        setTrigger((prev) => !prev);
        refetch();

    }, REFETCH_INTERVAL * 2);

    const { data, isLoading, refetch } = useGetExportProductsListQuery({
        filter: {
            typeCodes: [ EXPORT_SALES ],
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

        if (data?.content && !data?.content.find(item => item.status.code === exportFileStatuses.IN_PROGRESS
            || item.status.code === exportFileStatuses.IN_QUEUE
            || item.status.code === exportFileStatuses.RETURNED_TO_QUEUE)) interval.stop();

    }, [ trigger ]);

    return {
        exportList: data?.content ?? null,
        isLoadingExportList: isLoading,
    };

};
