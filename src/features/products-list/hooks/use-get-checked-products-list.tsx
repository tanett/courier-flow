import { useProductsList } from '../../../entities/products/hooks/use-products-list';
import { useListState } from '@mantine/hooks';
import { typeProductExtendedWithCheckBox } from 'features/products-list/types/types';
import { useEffect } from 'react';

export const useGetCheckedProductsList = () => {

    const {
        productsList,
        pagination,
        isLoading,
    } = useProductsList();

    // product list with checked
    const [ values, handlers ] = useListState<typeProductExtendedWithCheckBox>(undefined);

    useEffect(() => {

        if (productsList) {

            handlers.setState(productsList.map(item => ({
                ...item,
                checked: false,
            })));

        }

    }, [ productsList ]);
    return {
        productsCheckedList: values,
        isLoading: isLoading || (isLoading && values.length === 0) || (!!productsList && productsList.length > 0 && values.length === 0),
        pagination,
        handlers,
    };

};
