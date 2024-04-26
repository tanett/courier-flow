import { useEffect } from 'react';
import { useListState } from '@mantine/hooks';
import { typeCategoryWithCheckBox } from 'features/categories-list/types/types';
import { useGetExtendedCategoriesList } from '../../../entities/category/hooks/use-get-extended-categories-list';

export const useGetCheckedCategoriesList = () => {

    const {
        categoriesList,
        isLoading,
        pagination,
    } = useGetExtendedCategoriesList();

    // categories list with checked
    const [ values, handlers ] = useListState<typeCategoryWithCheckBox>(undefined);

    useEffect(() => {

        if (categoriesList) {

            handlers.setState(categoriesList.map(item => ({
                ...item,
                checked: false,
            })));

        }

    }, [ categoriesList ]);


    return {
        categoriesCheckedList: values,
        isLoading: isLoading || (isLoading && values.length === 0) || (!!categoriesList && categoriesList.length > 0 && values.length === 0),
        pagination,
        handlers,
    };

};
