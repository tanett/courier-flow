import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { UsersCreateNew } from 'features/users-create';

const UsersCreatePage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Users`) },
                    { name: i18n._(t`Create`) }
                ]}/>}
            />
            <UsersCreateNew/>
        </DashboardContent>
    );

};

export default UsersCreatePage;
