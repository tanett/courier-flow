import { useRefundsRequestData } from './use-refunds-request-data';
import { useLazySearchRefundsQuery } from '../api/api';

export const useRefundsListRefetch = () => {

    const { requestData } = useRefundsRequestData();

   const [ refetch ] = useLazySearchRefundsQuery();

   const refundsListRefetch = () => refetch(requestData);

   return { refundsListRefetch: refundsListRefetch };

};
