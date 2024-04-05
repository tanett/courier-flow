import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { UserList } from '../../../features/user-list';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { addUserPermissions } from '../../../app/config/permissions-config';
import { CreateButtonFilled } from 'shared/ui/create-button-filled/create-button-filled';

const UsersPage: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const isAllowAddUser = useIsAllowedPermissions(addUserPermissions);

    const onCreateNewUser = () => {

        navigate(routerPaths.users_create);

    };

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Users`) }
                ] }
                /> }
                rightSide={
                    isAllowAddUser && <CreateButtonFilled
                        id={'create-new-user'}
                        handler={onCreateNewUser}
                    />}
            />
            <UserList/>
        </DashboardContent>
    );

};

export default UsersPage;
