import { useTerminalsRequestData } from './use-terminals-request-data';
import {  useLazySearchTerminalsExtendedQuery } from '../api/api';

export const useExtendedTerminalsListRefetch = () => {

    const { requestData } = useTerminalsRequestData();

    const [ refetch ] = useLazySearchTerminalsExtendedQuery();

    const extendedTerminalsListRefetch = () => refetch(requestData);

    return { extendedTerminalsListRefetch: extendedTerminalsListRefetch };

};
