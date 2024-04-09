import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { ProductEdit } from 'features/product-edit';

const ProductsEditPage: React.FC = () => {

    const { i18n } = useLingui();

    return (
        <DashboardContent withForm>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Products`) },
                    { name: i18n._(t`Edit`) }
                ]}/>}
            />

           <ProductEdit/>

        </DashboardContent>
    );

};

export default ProductsEditPage;
