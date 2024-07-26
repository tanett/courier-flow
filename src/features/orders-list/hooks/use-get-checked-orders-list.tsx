import { useListState } from '@mantine/hooks';
import { useEffect } from 'react';
import { useShortOrdersList } from '../../../entities/orders/hooks/use-short-orders-list';
import { typeOrdersShortWithCheckBox } from 'features/orders-list/types/types';

export const useGetCheckedOrdersList = () => {

    const {
        ordersShortList,
        pagination,
        isLoading,
    } = useShortOrdersList();

    // orders list with checked
    const [ values, handlers ] = useListState<typeOrdersShortWithCheckBox>(undefined);

    useEffect(() => {

        if (ordersShortList) {

            handlers.setState(ordersShortList.map(item => ({
                ...item,
                checked: false,
            })));

        }

    }, [ ordersShortList ]);

    return {
        ordersCheckedList: values,
        isLoading: isLoading || (isLoading && values.length === 0) || (!!ordersShortList && ordersShortList.length > 0 && values.length === 0),
        pagination,
        handlers,
    };

};
