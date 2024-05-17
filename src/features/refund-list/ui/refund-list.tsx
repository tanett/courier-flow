import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {t, Trans} from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from '../../../shared/ui/modal';
import { useSelectorT } from '../../../app/state';
import {RefundListTable} from "./refund-table";
import {useRefundsList} from "../../../entities/refunds/hooks/use-refunds-list";
import {Button, Flex} from "@mantine/core";
import {useStyles} from "./styles";

export const RefundList: React.FC = () => {

    const { i18n } = useLingui();

    const {classes} = useStyles();

    const navigate = useNavigate();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const [isOpenReceipt, setIsOpenReceipt] = useState<{id: string | number} | null>(null);

    const {
        refundsList,
        pagination,
        isLoading,
    } = useRefundsList();

    const onOpenReceipt = (id: string | number) => setIsOpenReceipt({id: id});

    const onCloseReceipt = () => setIsOpenReceipt(null);

    // const goToDetailsUserPage = (id: string | number, name: string) => navigate([ routerPaths.users, id.toString(), name ].join('/'));


    return (<>
        <RefundListTable
            refundList={refundsList}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsReceiptPage={() => console.log('details')}
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
