import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useLazyGetProductCategoryByIdQuery } from '../api/api';
import { typeProductCategory } from '../model/types';


const useGetCategoryDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeProductCategory>();

    const [ productCategoryData, { isFetching } ] = useLazyGetProductCategoryByIdQuery();

    const getData = async (id: string) => {

        try {

            const productCategory = await productCategoryData(id).unwrap();
            setData(productCategory);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetProductCategory', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getData(id).then();

        }

    }, []);


    return {
        productCategoryData: data,
        isProductFetching: isFetching,
    };

};

export default useGetCategoryDataByIdFromUrl;
