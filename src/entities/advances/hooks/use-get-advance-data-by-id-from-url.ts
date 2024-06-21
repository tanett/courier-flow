import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useLazyGetAdvanceByIdQuery } from '../../../entities/advances/api/api';
import { typeAdvance } from 'entities/advances/model/state-slice/types';


const useGetAdvanceDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeAdvance>();

    const [ advancesData, { isFetching } ] = useLazyGetAdvanceByIdQuery();

    const getData = async (id: string) => {

        try {

            const resp = await advancesData(id).unwrap();
            setData(resp);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetAdvance', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getData(id).then();

        }

    }, []);


    return {
        advancesData: data,
        isAdvanceFetching: isFetching,
    };

};

export default useGetAdvanceDataByIdFromUrl;
