import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { CategoriesCreate } from 'features/categories-create';

const CategoriesCreatePage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Categories`) },
                    { name: i18n._(t`Create`) }
                ]}/>}
            />
            <CategoriesCreate/>
        </DashboardContent>
    );

};

export default CategoriesCreatePage;
