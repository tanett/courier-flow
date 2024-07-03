import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { typeCredit } from '../model/types';
import { useLazyGetCreditByIdQuery } from '../api/api';


const useGetCreditDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeCredit>();

    const [ creditsData, { isFetching } ] = useLazyGetCreditByIdQuery();

    const getData = async (id: string) => {

        try {

            const resp = await creditsData(id).unwrap();
            setData(resp);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetCredits', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getData(id).then();

        }

    }, []);


    return {
        creditData: data,
        isCreditFetching: isFetching,
    };

};

export default useGetCreditDataByIdFromUrl;
