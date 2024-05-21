import React from 'react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { typeCheckedShortSalesExtended } from 'features/sales-list/types/types';
import { ExportSalesDialog } from 'features/sales-export';

export const ModalExportSelectedSales: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    list: typeCheckedShortSalesExtended[]
}> = ({
    setOpen,
    list,
}) => {

    const { i18n } = useLingui();

    const onCloseDialogToAdd = () => {

        setOpen(false);

    };

    return (
        <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ () => onCloseDialogToAdd() }>
            <Modal.Body>
                <>
                    <Modal.Header title={ i18n._(t`Export selected products`) } onClose={ () => onCloseDialogToAdd() }/>
                    <ExportSalesDialog salesIds={list.filter(item => item.checked).map(item => item.id)} />
                </>
            </Modal.Body>
        </Modal>
    );

};
