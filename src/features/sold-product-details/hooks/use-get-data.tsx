import { useGetSaleByIdQuery } from '../../../entities/sales/api/api';
import { useEffect, useState } from 'react';
import { typeSoldProduct } from '../../../entities/sales/model/types';
import { typeResponseError } from 'app/api/types';

export const useGetData = (id: string, productName: string) => {

    const {
        data: saleData,
        isFetching,
        error
    } = useGetSaleByIdQuery(id);

    const [ product, setProduct ] = useState<typeSoldProduct | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isNotFound, setIsNotFound ] = useState(false);

    useEffect(() => {
        if (saleData) {
            setIsLoading(true);
            const product = saleData.products.find(item => item.name === productName);
            if (product) {
                setProduct(product);
            } else {setIsNotFound(true);}
            setIsLoading(false);
        }
    }, [ saleData ]);

    useEffect(() => {
        if (error) {
            if ((error as typeResponseError).status === 404) {
                setIsNotFound(true);
            }
        }

    }, [ error ]);


    return {
        product,
        isNotFound,
        isLoading: isLoading || isFetching
    };
};
