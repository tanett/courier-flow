import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { UserArchiveButton } from 'features/user-archive-button';
import { useParams } from 'react-router-dom';
import { UsersEdit } from 'features/users-edit/ui/usersEdit';
import { UsersDetails } from 'features/users-details';


const UsersDetailsPage: React.FC = () => {

    const { i18n } = useLingui();

    const { id, userName } = useParams();

    return (
        <DashboardContent >
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Users`) },
                    { name: userName || '------'}
                ] }/> }

            />
            <UsersDetails />
        </DashboardContent>
    );

};

export default UsersDetailsPage;
