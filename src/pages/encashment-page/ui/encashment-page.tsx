import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';

const EncashmentPage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Encashment`) }
                ]}/>}
            />

            Encashment

        </DashboardContent>
    );

};

export default EncashmentPage;
