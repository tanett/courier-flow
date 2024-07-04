import React from 'react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { WorkingShiftDetails } from 'features/working-shifts-details';
import { useParams } from 'react-router-dom';

const WorkingShiftsDetailsPage: React.FC = () => {


    const {id} = useParams();

    return (
        <DashboardContent>

            {id && <WorkingShiftDetails id={ id }/> }

        </DashboardContent>
    );

};

export default WorkingShiftsDetailsPage;
