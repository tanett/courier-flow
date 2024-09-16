import { useParams } from 'react-router-dom';
import { useLazyGetUserByIdQuery } from '../../users/api/api';
import { useEffect, useState } from 'react';
import { typeUser } from '../../user-profile/model/state-slice';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';


const useGetUserDataByIdFromUrl = () => {

    const dispatchAppT = useAppDispatchT();

    const { id } = useParams();

    const [ data, setData ] = useState<typeUser>();

    const [ userData, { isFetching, error } ] = useLazyGetUserByIdQuery();

    const getUserData = async (id: string) => {

        try {

            const user = await userData(id).unwrap();
            setData(user);

        } catch (err){

            errorHandler(err as typeResponseError, 'onGetUser', dispatchAppT);

        }

    };

    useEffect(() => {

        if (id){

            getUserData(id).then();

        }

    }, []);


    return {
        userData: data,
        isUserFetching: isFetching,
        error
    };

};

export default useGetUserDataByIdFromUrl;
