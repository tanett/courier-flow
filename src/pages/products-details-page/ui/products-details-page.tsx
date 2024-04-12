import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useParams } from 'react-router-dom';
import { ProductArchiveButton } from 'features/product-archive-button';
import ProductsDetailsTabs from 'features/products-details-tabs/ui/products-details-tabs';


const ProductsDetailsPage: React.FC = () => {

    const { i18n } = useLingui();

    const { id, name } = useParams();

    return (
        <DashboardContent >
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Products`) },
                    { name: name || '------' }
                ] }/> }
                rightSide={<ProductArchiveButton id={id}/>}

            />
            {id && <ProductsDetailsTabs productId={id}/> }
        </DashboardContent>
    );

};

export default ProductsDetailsPage;
