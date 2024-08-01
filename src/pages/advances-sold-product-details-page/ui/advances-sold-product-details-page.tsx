import React from 'react';
import { useLingui } from '@lingui/react';
import { generatePath, useParams } from 'react-router-dom';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { routerPaths } from 'app/config/router-paths';
import { TYPE_TABS } from 'features/sales-details/ui/sales-details-tabs';
import { AdvancesSoldProductsDetails } from 'features/advances-details/ui/advances-sold-product-details';
import useGetAdvanceDataByIdFromUrl from '../../../entities/advances/hooks/use-get-advance-data-by-id-from-url';
import { LoaderOverlay } from 'shared/ui/loader-overlay';


const AdvancesSoldProductDetailsPage: React.FC = () => {

    const {
        id,
        name
    } = useParams();

    const { i18n } = useLingui();
    const {
        advancesData,
        isAdvanceFetching
    } = useGetAdvanceDataByIdFromUrl();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    {
                        name: i18n._(t`Advances`),
                        path: routerPaths.sales
                    },
                    {
                        name: advancesData?.publicId || '---',
                        path: generatePath(routerPaths.advances_details, {
                            id: id,
                            publicId: advancesData?.publicId || ''
                        })
                    },
                    {
                        name: i18n._(t`Sold products`),
                        path: generatePath(routerPaths.advances_details, {
                            id: id,
                            publicId: advancesData?.publicId || ''
                        }) + `?tab=${ TYPE_TABS.SOLD_PRODUCTS }`
                    },
                    { name: name || '---' },
                ] }/> }

            />
            <AdvancesSoldProductsDetails />
            {isAdvanceFetching && <LoaderOverlay/>}
        </DashboardContent>
    );

};

export default AdvancesSoldProductDetailsPage;
