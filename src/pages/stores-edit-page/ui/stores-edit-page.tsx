import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { generatePath, useParams } from 'react-router-dom';
import { StoreEdit } from 'features/stores-edit';
import { routerPaths } from 'app/config/router-paths';


const StoresEditPage: React.FC = () => {

    const { i18n } = useLingui();

    const { id, storeName } = useParams();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Stores`), path: routerPaths.stores },
                    { name: storeName || '---' , path: generatePath(routerPaths.stores_details , { id, storeName })},
                    { name: i18n._(t`Edit`) }
                ] }/> }
            />
            {id && <StoreEdit storeId={ id }/> }
        </DashboardContent>
    );

};

export default StoresEditPage;
