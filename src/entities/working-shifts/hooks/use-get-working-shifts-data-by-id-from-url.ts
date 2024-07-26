import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useLazyGetWorkingShiftsByIdQuery } from '../api/api';
import { typeWorkingShifts} from '../model/types';


const useGetWorkingShiftsDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeWorkingShifts>();

    const [ getWorkingShiftData, { isFetching } ] = useLazyGetWorkingShiftsByIdQuery();

    const getData = async (id: string) => {

        try {

            const data = await getWorkingShiftData(id).unwrap();
            setData(data);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetWorkingShifts', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getData(id).then();

        }

    }, []);


    return {
        workingShiftData: data,
        isWorkingShiftFetching: isFetching,
    };

};

export default useGetWorkingShiftsDataByIdFromUrl;
