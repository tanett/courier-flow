import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import {useParams} from "react-router-dom";

const RefundDetailsPage: React.FC = () => {

    const { i18n } = useLingui();

    const { id, refundNumber } = useParams();

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Refunds`) },
                    { name: refundNumber || '------' },
                ] }
                /> }
            />
            Refund details
        </DashboardContent>
    );

};

export default RefundDetailsPage;
