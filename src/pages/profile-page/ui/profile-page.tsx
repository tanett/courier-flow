import React from 'react';
import { LogoutButton } from '../../../features/logout';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Profile } from 'features/profile-show-edit';

const ProfilePage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Profile`) }
                ]}/>}
                rightSide={<LogoutButton/>}
            />
            <Profile/>
        </DashboardContent>
    );

};

export default ProfilePage;
