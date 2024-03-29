import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { ProductsList } from 'features/products-list';
import { ProductsListButtonsPanel } from 'features/products-list-buttons-panel';

const ProductsPage: React.FC = () => {


    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Products`) }
                ] }/> }
                rightSide={<ProductsListButtonsPanel/>}
            />

            <ProductsList/>

        </DashboardContent>
    );

};

export default ProductsPage;
