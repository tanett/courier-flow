import React from 'react';
import { useLingui } from '@lingui/react';
import { DashboardContent } from '../../../shared/ui/dashboard-content';
import { DashboardBreadcrumbs } from '../../../shared/ui/dashboard-breadcrumbs';
import { t } from '@lingui/macro';
import {useParams} from "react-router-dom";
import {ZReportsDetails} from "../../../features/z-reports-details";
import {useZReportDetails} from "../../../features/z-reports-details/hooks/use-z-report-details";

const ZReportsDetailsPage: React.FC = () => {

    const { i18n } = useLingui();

    const { zReportNumber } = useParams();

    const {
        zReportData,
        isNotFound,
        isZReportLoading,
    } = useZReportDetails()

    return (
        <DashboardContent>
            <DashboardContent.Header
                leftSide={<DashboardBreadcrumbs dataList={[
                    { name: i18n._(t`Z-reports`) },
                    { name: zReportNumber ?? "---" },
                ]}/>}
            />

           <ZReportsDetails
               isZReportLoading={isZReportLoading}
               zReportData={zReportData}
               isNotFound={isNotFound}
           />

        </DashboardContent>
    );

};

export default ZReportsDetailsPage;
