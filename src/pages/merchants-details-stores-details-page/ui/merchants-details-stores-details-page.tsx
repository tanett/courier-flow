import React from 'react';
import { useLingui } from '@lingui/react';
import { useParams } from 'react-router-dom';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { MerchantStoreDetails } from 'features/merchant-details-store-details';
import SkeletonStoresDetailsPage from 'pages/merchants-details-stores-details-page/ui/skeleton-stores-details-page';


const MerchantsDetailsStoresDetailsPage: React.FC = () => {

    const { id, name, storeId, storeName } = useParams();

    const { i18n } = useLingui();

    return ((id && name && storeId) ? <>
        <DashboardContent.Header
            leftSide={ <DashboardBreadcrumbs dataList={ [
                { name: i18n._(t`Merchants`) },
                { name: name || '---' },
                { name: i18n._(t`Stores`) },
                { name: storeName || '---' }
            ] }/> }

        />

        <MerchantStoreDetails storeId={storeId}/>

    </>
        :
        <SkeletonStoresDetailsPage/>

    );

};

export default MerchantsDetailsStoresDetailsPage;
