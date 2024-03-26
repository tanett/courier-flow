import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useLazyGetProductByIdQuery } from '../../../entities/products/api/api';
import { typeProduct } from '../../../entities/products/model/state-slice/types';


const useGetProductDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeProduct>();

    const [ productData, { isFetching } ] = useLazyGetProductByIdQuery();

    const getData = async (id: string) => {

        try {

            const product = await productData(id).unwrap();
            setData(product);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetProduct', dispatchAppT);

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

export default useGetProductDataByIdFromUrl;
