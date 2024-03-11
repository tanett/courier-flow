import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t, Trans } from '@lingui/macro';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { IconPlus } from '@tabler/icons-react';
import { UserList } from '../../../features/user-list';
import { useStyles } from './styles';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { addUserPermissions } from '../../../app/config/permissions-config';

const UsersPage: React.FC = () => {

    const { classes } = useStyles();

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
                    isAllowAddUser && <Button
                        key={'create-new-user'}
                        className={classes.button}
                        onClick={onCreateNewUser}
                        leftIcon={<IconPlus size={20}/>}><Trans>Add</Trans>
                    </Button>}
            />
            <UserList/>
        </DashboardContent>
    );

};

export default UsersPage;
