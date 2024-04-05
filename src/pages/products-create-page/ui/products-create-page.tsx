import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { ProductCreate } from 'features/product-create';

const ProductsCreatePage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Products`) },
                    { name: i18n._(t`Create`) }
                ]}/>}
            />

            <ProductCreate/>

        </DashboardContent>
    );

};

export default ProductsCreatePage;
