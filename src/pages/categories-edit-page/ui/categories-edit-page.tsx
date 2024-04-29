import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { CategoriesEdit } from 'features/categories-edit';
import { useParams } from 'react-router-dom';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { routerPaths } from 'app/config/router-paths';

const CategoriesEditPage: React.FC = () => {

    const { i18n } = useLingui();

    const { id } = useParams();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Categories`) , path: routerPaths.products_categories },
                    { name: i18n._(t`Edit`) }
                ]}/>}
            />
            {id ? <CategoriesEdit categoryId={ id }/> : <LoaderOverlay/> }
        </DashboardContent>
    );

};

export default CategoriesEditPage;
