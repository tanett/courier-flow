import React from 'react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { typeProductExtendedWithCheckBox } from 'features/products-list/types/types';
import { ProductsExport } from 'features/products-export';

export const ModalExportSelectedProduct: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    list: typeProductExtendedWithCheckBox[]
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
                    <ProductsExport productIds={list.filter(item => item.checked).map(item => item.id)} />
                </>
            </Modal.Body>
        </Modal>
    );

};
