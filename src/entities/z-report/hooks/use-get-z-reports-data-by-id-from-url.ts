import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import {typeZReport} from "../model/types";
import {useLazyGetZReportByIdQuery} from "../api/api";


const useGetZReportsDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeZReport>();

    const [ zReportData, { isFetching } ] = useLazyGetZReportByIdQuery();

    const getData = async (id: string) => {

        try {

            const product = await zReportData(id).unwrap();
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

export default useGetZReportsDataByIdFromUrl;
