import { useExtendedProductsList } from '../../../entities/products/hooks/use-extended-products-list';
import { useListState } from '@mantine/hooks';
import { typeProductExtendedWithCheckBox } from 'features/products-list/types/types';
import { useEffect } from 'react';

export const useGetCheckedProductsList = () => {

    const {
        extendedProductsList,
        pagination,
        isLoading,
    } = useExtendedProductsList();

    // product list with checked
    const [ values, handlers ] = useListState<typeProductExtendedWithCheckBox>(undefined);

    useEffect(() => {

        if (extendedProductsList) {

            handlers.setState(extendedProductsList.map(item => ({
                ...item,
                checked: false,
            })));

        }

    }, [ extendedProductsList ]);

    return {
        productsCheckedList: values,
        isLoading: isLoading || (isLoading && values.length === 0) || (!!extendedProductsList && extendedProductsList.length > 0 && values.length === 0),
        pagination,
        handlers,
    };

};
