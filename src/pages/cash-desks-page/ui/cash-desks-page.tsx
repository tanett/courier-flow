import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { CashDeskList } from '../../../features/cash-desk-list';
import { CashDeskListButtonsPanel } from '../../../features/cash-desk-list-buttons-panel';

const CashDesksPage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Cash desks`) }
                ]}/>}
                rightSide={<CashDeskListButtonsPanel/>}
            />

            <CashDeskList/>

        </DashboardContent>
    );

};

export default CashDesksPage;
