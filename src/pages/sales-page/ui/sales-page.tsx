import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { SalesList } from 'features/sales-list';

const SalesPage: React.FC = () => {


    const { i18n } = useLingui();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Sales`) }
                ] }/> }
              //  rightSide={<ProductsListButtonsPanel/>} todo
            />

            <SalesList/>

        </DashboardContent>
    );

};

export default SalesPage;
