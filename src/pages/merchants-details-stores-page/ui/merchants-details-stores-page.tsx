import React from 'react';
import { useLingui } from '@lingui/react';
import { useParams } from 'react-router-dom';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t, Trans } from '@lingui/macro';
import { Button } from '@mantine/core';
import { ComputerDesktopIcon } from '@heroicons/react/24/outline';

import { MerchantDetailsStores } from 'features/merchant-details-stores';
import { useIsAllowedPermissions } from 'entities/users/hooks/use-is-allowed-permissions';
import {  remoteControlMerchantPermissions } from 'app/config/permissions-config';


const MerchantsDetailsStoresPage: React.FC = () => {

    const { name } = useParams();

    const { i18n } = useLingui();


    const isAllowRemoteControlMerchants = useIsAllowedPermissions(remoteControlMerchantPermissions);

    return (
        <>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Merchants`) },
                    { name: name || '---' }
                ] }/> }

                rightSide={
                    isAllowRemoteControlMerchants && <Button
                        key={ 'remote-control' }

                        //   className={ classes.remoteBtn }
                        onClick={ () => console.log('remote click') }
                        leftIcon={ <ComputerDesktopIcon/> }><Trans>Remote control</Trans>
                    </Button>
                }
            />
            <div>
                {/* <MerchantDetailsPageTabs activeTab={ pathSections.stores }/>*/}

                <MerchantDetailsStores/>
            </div>

        </>

    );

};

export default MerchantsDetailsStoresPage;
