import React from 'react';
import { useLingui } from '@lingui/react';
import { generatePath, useParams } from 'react-router-dom';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { routerPaths } from 'app/config/router-paths';
import { TYPE_TABS } from 'features/sales-details/ui/sales-details-tabs';
import { SoldProductsDetails } from 'features/sold-product-details';


const SoldProductDetailsPage: React.FC = () => {

    const {  id, publicId, name} = useParams();

    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Sales`), path: routerPaths.sales },
                    { name: publicId || '---' , path: generatePath(routerPaths.sales_details,{id: id, publicId: publicId}) },
                    { name: i18n._(t`Sold products`) , path: generatePath(routerPaths.sales_details,{id: id, publicId: publicId})+`?f=tab.${TYPE_TABS.SOLD_PRODUCTS}` },
                    { name: name || '---' },
                ] }/> }

            />
            { id && name && <SoldProductsDetails id={id} productName={name}/> }

        </DashboardContent>
    );

};

export default SoldProductDetailsPage;
