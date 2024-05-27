import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {t, Trans} from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from '../../../shared/ui/modal';
import {RefundListTable} from "./z-reports-table";
import {useRefundsList} from "../../../entities/refunds/hooks/use-refunds-list";
import {Button, Flex} from "@mantine/core";
import {useStyles} from "./styles";
import {routerPaths} from "../../../app/config/router-paths";
import {useZReportsList} from "../../../entities/z-report/hooks/use-z-reports-list";

export const ZReportsList: React.FC = () => {

    const { i18n } = useLingui();

    const {classes} = useStyles();

    const navigate = useNavigate();

    // const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const [isOpenReceipt, setIsOpenReceipt] = useState<{id: string | number} | null>(null);

    const {
        zReportsList,
        pagination,
        isLoading,
    } = useZReportsList();

    const onOpenReceipt = (id: string | number) => setIsOpenReceipt({id: id});

    const onCloseReceipt = () => setIsOpenReceipt(null);

    const goToDetailsUserPage = (id: string | number, refundNumber: number) => navigate([ routerPaths.z_reports, id.toString(), refundNumber].join('/'));


    return (<>
        <RefundListTable
            zReportsList={zReportsList}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsReportPage={goToDetailsUserPage}
            onOpenReceipt={onOpenReceipt}
        />


        { isOpenReceipt && <Modal modalWidth="dialog" opened={ true } onCloseByOverlay={onCloseReceipt}>
            <Modal.Body>
                <Modal.Header title={i18n._(t`Receipt`)} onClose={onCloseReceipt}/>
                <Modal.Body>
                    receipt
                    <Flex className={classes.buttonPanelWrapper}>
                        <Button variant='outline' onClick={onCloseReceipt}><Trans>Close</Trans></Button>
                        <Button><Trans>Print</Trans></Button>
                    </Flex>
                </Modal.Body>
            </Modal.Body>
        </Modal> }

    </>);

};
