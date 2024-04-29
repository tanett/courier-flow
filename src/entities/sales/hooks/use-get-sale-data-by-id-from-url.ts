import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useLazyGetProductByIdQuery } from '../../../entities/products/api/api';
import { typeProduct } from '../../../entities/products/model/state-slice/types';


const useGetSaleDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeProduct>();

    const [ salesData, { isFetching } ] = useLazyGetProductByIdQuery();

    const getData = async (id: string) => {

        try {

            const product = await salesData(id).unwrap();
            setData(product);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetSales', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getData(id).then();

        }

    }, []);


    return {
        productData: data,
        isProductFetching: isFetching,
    };

};

export default useGetSaleDataByIdFromUrl;
