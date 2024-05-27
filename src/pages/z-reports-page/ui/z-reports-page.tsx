import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import {ZReportsList} from "../../../features/z-reports-list";

const ZReportsPage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Z-reports`) }
                ]}/>}
            />

           <ZReportsList/>

        </DashboardContent>
    );

};

export default ZReportsPage;
