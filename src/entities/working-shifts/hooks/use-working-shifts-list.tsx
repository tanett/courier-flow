import { useWorkingShiftsRequestData } from './use-working-shifts-request-data';
import { useSearchWorkingShiftsQuery } from '../api/api';


export function useWorkingShiftsList() {

    const { requestData } = useWorkingShiftsRequestData();

  const { data, isFetching, isLoading, refetch } = useSearchWorkingShiftsQuery(requestData);

    const pagination = data?.totalPages
        ? {
            pageNumber: data.pageNumber,
            totalPages: data.totalPages,
            totalElements: data.totalElements,
            pageSize: data.pageSize,
        }
        : undefined;


    return {
        workingShiftsList: data?.content,
        isLoading: isFetching || isLoading,
        pagination,
        refetch,
    };

}
