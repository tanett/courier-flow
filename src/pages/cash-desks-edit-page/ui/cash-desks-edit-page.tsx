import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useParams } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { CashDeskEdit } from 'features/cash-desk-edit';

const CashDesksEditPage: React.FC = () => {

    const { i18n } = useLingui();

    const { cashDeskId } = useParams();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Cash desks`), path: routerPaths.cash_desks },
                    { name: i18n._(t`Edit`) }
                ]}/>}
            />

            {cashDeskId && <CashDeskEdit cashDeskId={cashDeskId}/> }

        </DashboardContent>
    );

};

export default CashDesksEditPage;
