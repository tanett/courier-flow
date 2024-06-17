import { sortDirection, typeSearchRequest } from 'app/api/types';
import { typeSearchFilterCategory } from '../../../entities/category/api/types';
import { useLazySearchCategoryExtendedQuery, } from '../../../entities/category/api/api';
import { useEffect, useState } from 'react';
import { typeCategoryExtended } from '../../../entities/category/model/types';

export const useGetInitialCategories = (categoriesIds: string[] | undefined)=> {
    let pageNumber=0
    const requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'> = {
        filter: {ids: categoriesIds},
        pagination: {
            pageNumber: pageNumber,
            pageSize: 50,
        },
        sorts: [
            {
                sort: 'NAME',
                direction: sortDirection.asc,
            }
        ],
    }

    const [initialLoading, setInitialLoading] = useState<boolean>(false);

    const getData = async (requestData: typeSearchRequest<typeSearchFilterCategory, 'NAME'>) => {
        try {
          const response = await getCategoriesData(requestData).unwrap()
            if(response.totalPages > pageNumber){
                pageNumber += 1;
                setCategoriesList((categoriesList && response.pageNumber>0) ? [ ...categoriesList, ...response.content ] : response.content);
                getData(requestData)
            } else {
                setCategoriesList((categoriesList && response.pageNumber>0) ? [ ...categoriesList, ...response.content ] : response.content);
            }
        } catch (err){
            console.log(err);
        }
    }

    const [getCategoriesData, {isFetching: isLazyLoading}] = useLazySearchCategoryExtendedQuery()

    const [ categoriesList, setCategoriesList ] = useState<typeCategoryExtended[] | null>(null);

    useEffect(() => {
        if(categoriesIds) {
            setInitialLoading(true);
            getData(requestData).finally(() => setInitialLoading(false));
        }

    }, [ categoriesIds ]);

    return {
        categoriesList,
        initialLoading,
    }
}
