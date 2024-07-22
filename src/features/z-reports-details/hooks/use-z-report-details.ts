import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {useLazyGetZReportByIdQuery} from "../../../entities/z-report/api/api";
import {typeZReport} from "../../../entities/z-report/model/types";

export const useZReportDetails = () => {

    const { id } = useParams();

    const [getZReportData, {isLoading: isZReportLoading, error, }] = useLazyGetZReportByIdQuery()

    const [ zReportData, setZReportData ] = useState<null | typeZReport>(null);


    useEffect(() => {

        if (id) {

            getZReportData(id)
                .then(response => {

                    if (response.status === 'fulfilled') setZReportData(response.data);
                    if (response.status === 'rejected') {
                        setZReportData(null);
                    }

                });

        }

    }, [ id ]);


    return {
        isNotFound: !!error ?? undefined,
        isZReportLoading,
        zReportData,
    };

};
