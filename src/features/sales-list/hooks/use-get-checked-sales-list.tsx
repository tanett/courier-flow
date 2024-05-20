import { useListState } from '@mantine/hooks';
import { useEffect } from 'react';
import { useShortSalesList } from '../../../entities/sales/hooks/use-short-products-list';
import { typeCheckedShortSalesExtended } from '../types/types';

export const useGetCheckedSalesList = () => {

    const {
        shortSalesList,
        pagination,
        isLoading,
    } = useShortSalesList();

    // product list with checked
    const [ values, handlers ] = useListState<typeCheckedShortSalesExtended>(undefined);

    useEffect(() => {

        if (shortSalesList) {

            handlers.setState(shortSalesList.map(item => ({
                ...item,
                checked: false,
            })));

        }

    }, [ shortSalesList ]);

    return {
        shortSalesCheckedList: values,
        isLoading: isLoading || (isLoading && values.length === 0) || (!!shortSalesList && shortSalesList.length > 0 && values.length === 0),
        pagination,
        handlers,
    };

};
