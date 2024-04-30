import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useLazyGetRefundByIdQuery } from '../api/api';
import { typeRefund } from '../model/types';


const useGetRefundDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeRefund>();

    const [ refundsData, { isFetching } ] = useLazyGetRefundByIdQuery();

    const getData = async (id: string) => {

        try {

            const product = await refundsData(id).unwrap();
            setData(product);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetRefund', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getData(id).then();

        }

    }, []);


    return {
        refundData: data,
        isRefundFetching: isFetching,
    };

};

export default useGetRefundDataByIdFromUrl;
