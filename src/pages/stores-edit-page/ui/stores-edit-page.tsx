import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { UserArchiveButton } from 'features/user-archive-button';
import { useParams } from 'react-router-dom';
import { StoreEdit } from 'features/stores-edit';


const StoresEditPage: React.FC = () => {

    const { i18n } = useLingui();

    const { id } = useParams();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Stores`) },
                    { name: i18n._(t`Edit`) }
                ] }/> }
            />
            {id && <StoreEdit storeId={ id }/> }
        </DashboardContent>
    );

};

export default StoresEditPage;
