import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { generatePath, useParams } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { StoresUsersEdit } from 'features/stores-user-edit';


const StoresUsersEditPage: React.FC = () => {

    const { i18n } = useLingui();

    const {
        id,
        storeName,
    } = useParams();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Stores`), path: routerPaths.stores },
                    { name: storeName || '---', path: generatePath(routerPaths.stores_details, {id: id, storeName: storeName})  },
                    { name: i18n._(t`Users`), path: generatePath(routerPaths.stores_details, {id: id, storeName: storeName})+'?f=tab.users',  },
                    { name: i18n._(t`Edit`) }
                ] }/> }
            />
            <StoresUsersEdit />
        </DashboardContent>
    );

};

export default StoresUsersEditPage;
