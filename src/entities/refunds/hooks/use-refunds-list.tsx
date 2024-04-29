import { useRefundsRequestData } from './use-refunds-request-data';
import {  } from '../api/api';


export function useShortSalesList() {

    const { requestData } = useRefundsRequestData();

  //  const { data, isFetching, isLoading, refetch } = useSearchSalesShortQuery(requestData); todo

    // const pagination = data?.totalPages
    //     ? {
    //         pageNumber: data.pageNumber,
    //         totalPages: data.totalPages,
    //         totalElements: data.totalElements,
    //         pageSize: data.pageSize,
    //     }
    //     : undefined;


    return {
        // shortSalesList: data?.content,
        // isLoading: isFetching || isLoading,
        // pagination,
        // refetch,
    };

}
