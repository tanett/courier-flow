import { useLazyGetWorkingShiftsByIdQuery } from '../../../entities/working-shifts/api/api';
import { useEffect, useState } from 'react';
import { typeWorkingShifts } from '../../../entities/working-shifts/model/types';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useLazyGetUserByIdQuery } from '../../../entities/users/api/api';

type typeWorkingShiftsWithName = typeWorkingShifts & { openedByName: string, closedByName: string }


export const useGetData = (id: string) => {

    const dispatchAppT = useAppDispatchT();

    const [ data, setData ] = useState<typeWorkingShiftsWithName | null>(null);

    const [
        getData,
        { isFetching },
    ] = useLazyGetWorkingShiftsByIdQuery();

    const [ getUser, { isFetching: isUserFetching } ] = useLazyGetUserByIdQuery();

    const getFullData = async (id: string) => {
        try {
            const res = await getData(id).unwrap();

            const obj: typeWorkingShiftsWithName = {
                openedByName: res.cashierName,
                closedByName: res.cashierName,
                ...res
            };
            if (res.openedBy !== res.cashierId) {
                try {
                    const user = await getUser(res.openedBy).unwrap();

                    obj.openedByName = user.fullName;

                } catch (err) {
                    console.log(err);
                    obj.openedByName = '-';
                }
            }
            if (res.closedBy !== res.cashierId) {
                try {
                    const user = await getUser(res.closedBy).unwrap();

                    obj.closedByName = user.fullName;

                } catch (err) {
                    obj.closedByName = '-';
                    console.log(err);
                }
            }
            setData(obj);

        } catch (err) {
            errorHandler(err as typeResponseError, 'onArchiveUser', dispatchAppT);
        }
    };

    useEffect(() => {
        if (id) {

            getFullData(id);
        }
    }, []);

    return {
        data,
        isFetching,
        isUserFetching,
    };
};
