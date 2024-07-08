import React from 'react';
import { useNavigate } from 'react-router-dom';

import {routerPaths} from "../../../app/config/router-paths";
import { WorkingShiftsTable } from './working-shifts-table';
import { useWorkingShiftsList } from '../../../entities/working-shifts/hooks/use-working-shifts-list';

export const WorkingShiftsList: React.FC = () => {

    const navigate = useNavigate();

    const {
        workingShiftsList,
        pagination,
        isLoading,
    } = useWorkingShiftsList();

    const goToDetailsPage = (id: string | number) => navigate([ routerPaths.working_shifts, id.toString()].join('/'));


    return (<>
        <WorkingShiftsTable
            list={workingShiftsList}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsPage={goToDetailsPage}
        />

    </>);

};
