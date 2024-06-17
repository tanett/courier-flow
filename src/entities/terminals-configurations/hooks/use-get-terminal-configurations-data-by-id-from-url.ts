import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { typeTerminalConfigurations } from '../model/state-slice';
import { useLazyGetTerminalConfigurationByIdQuery } from '../api/api';


const useGetTerminalConfigurationsDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeTerminalConfigurations>();

    const [ getDataById, { isFetching } ] = useLazyGetTerminalConfigurationByIdQuery();

    const getData = async (id: string) => {

        try {

            const result = await getDataById(id).unwrap();
            setData(result);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetTerminalConfigurations', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getData(id).then();

        }

    }, []);


    return {
         data,
         isFetching,
    };

};

export default useGetTerminalConfigurationsDataByIdFromUrl;
