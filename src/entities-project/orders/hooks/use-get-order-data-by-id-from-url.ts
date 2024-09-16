import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { typeOrder } from 'entities-project/orders/model/state-slice/types';
import { useLazyGetOrderByIdQuery } from '../api/api';


const useGetOrderDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeOrder>();

    const [ orderData, { isFetching } ] = useLazyGetOrderByIdQuery();

    const getData = async (id: string) => {

        try {

            const order = await orderData(id).unwrap();
            setData(order);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetOrder', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getData(id).then();

        }

    }, []);


    return {
        orderData: data,
        isOrderFetching: isFetching,
    };

};

export default useGetOrderDataByIdFromUrl;
