import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {t, Trans} from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from '../../../shared/ui/modal';
import {CashDeskTable} from "./cash-desk-table";
import {Button, Flex} from "@mantine/core";
import {useStyles} from "./styles";
import {routerPaths} from "../../../app/config/router-paths";
import {useCashDeskList} from "../../../entities/cash-desk/hooks/use-cash-desk-list";

export const CashDeskList: React.FC = () => {

    const { i18n } = useLingui();

    const {classes} = useStyles();

    const navigate = useNavigate();

    const [isOpenReceipt, setIsOpenReceipt] = useState<{id: string | number} | null>(null);

    const {
        cashDeskList,
        pagination,
        isLoading,
    } = useCashDeskList();

    // const onOpenReceipt = (id: string | number) => setIsOpenReceipt({id: id});

    const onEdit = (id: string | number) => console.log('edit', id);
    const onArchive = (id: string | number) => console.log('archive', id);

    const onCloseReceipt = () => setIsOpenReceipt(null);

    const goToDetailsCashDeskPage = (id: string | number, cashDeskName: string) => navigate([ routerPaths.cashDesks, id.toString(), cashDeskName].join('/'));


    return (<>
        <CashDeskTable
            cashDeskList={cashDeskList}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsCashDeskPage={goToDetailsCashDeskPage}
            onEdit={onEdit}
            onArchive={onArchive}
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
