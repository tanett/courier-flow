import React from 'react';
import { useLingui } from '@lingui/react';
import { useParams } from 'react-router-dom';
import { t } from '@lingui/macro';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { MerchantStoreEdit } from 'features/merchant-details-store-edit';


const MerchantsDetailsStoresEditPage: React.FC = () => {


    const {
        id,
        name,
        storeId,
    } = useParams();

    const { i18n } = useLingui();

    return (
        (id && storeId) ? <>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Merchants`) },
                    { name: name || '---' },
                    { name: i18n._(t`Edit the store`) }
                ] }/> }

            />

            <MerchantStoreEdit merchantId={ id } storeId={storeId}/>

        </> : <div/>

    // :
    // <SkeletonStoreCreatePage/>

    );

};

export default MerchantsDetailsStoresEditPage;
