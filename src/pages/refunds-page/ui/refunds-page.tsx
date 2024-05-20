import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from 'shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from 'shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import {RefundList} from "../../../features/refund-list";

const RefundsPage: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const onCreateNewUser = () => {

        navigate(routerPaths.users_create);

    };

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={ <DashboardBreadcrumbs dataList={ [
                    { name: i18n._(t`Refunds`) }
                ] }
                /> }
            />
            <RefundList/>
        </DashboardContent>
    );

};

export default RefundsPage;
