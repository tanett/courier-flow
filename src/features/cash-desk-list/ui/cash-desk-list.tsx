import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from '../../../shared/ui/modal';
import { CashDeskTable } from './cash-desk-table';
import { routerPaths } from '../../../app/config/router-paths';
import { useCashDeskList } from '../../../entities/cash-desk/hooks/use-cash-desk-list';
import { Dialog } from '../../../shared/ui/dialog-new';
import { LoaderOverlay } from '../../../shared/ui/loader-overlay';

export const CashDeskList: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const [ modalArchiveItemData, setModalArchiveItemData ] = useState<{id: string | number, name: string} | null>(null);

    const {
        cashDeskList,
        pagination,
        isLoading,
    } = useCashDeskList();

    // const onOpenReceipt = (id: string | number) => setIsOpenReceipt({id: id});

    const goToDetailsCashDeskPage = (id: string | number, cashDeskName: string) => navigate([ routerPaths.cash_desks, id.toString(), cashDeskName ].join('/'));

    const onEdit = (id: string | number) => navigate([ routerPaths.cash_desks, id.toString(), 'edit' ].join('/'));

    const onArchive = (id: string | number, name: string) => {

        setModalArchiveItemData({ id, name });

    };

    const onCloseArchivePopup = () => setModalArchiveItemData(null);

    const onConfirmDelete = () => {

        console.log('delete', modalArchiveItemData?.id);

    };

    const isArchiveLoading = false; // TODO: upgrade it

    return (<>
        <CashDeskTable
            cashDeskList={cashDeskList}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsCashDeskPage={goToDetailsCashDeskPage}
            onEdit={onEdit}
            onArchive={onArchive}
        />


        { modalArchiveItemData && <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseArchivePopup,
                    } }
                    confirmButton={ {
                        title: i18n._(`action-archive`),
                        handler: () => onConfirmDelete(),
                    } }
                >
                    <Trans>Are you sure you want to archive <br/>the cash desk</Trans>  &quot;{ modalArchiveItemData.name }&quot;?
                </Dialog>
                { isArchiveLoading && <LoaderOverlay/> }
            </Modal.Body>
        </Modal> }

    </>);

};
