import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { WorkingShiftsList } from 'features/working-shifts-list';

const WorkingShiftsPage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Working shifts`) }
                ]}/>}
            />

            <WorkingShiftsList/>

        </DashboardContent>
    );

};

export default WorkingShiftsPage;
