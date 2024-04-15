import React from 'react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { typeProductExtendedWithCheckBox } from 'features/products-list/types/types';
import { ProductsChangeCategory } from 'features/products-change-category/products-change-category';

export const ModalChangeCategorySelectedItem: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    list: typeProductExtendedWithCheckBox[]
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    setOpen,
    list,
    setRefetch
}) => {

    const { i18n } = useLingui();

    const onCloseDialogToAdd = (refetch: boolean) => {

        if (refetch) {

            setRefetch(true);

        }

        setOpen(false);

    };

    return (
        <Modal modalWidth="auto" opened={ true }  onCloseByOverlay={ () => onCloseDialogToAdd(false) }>
            <Modal.Body>
                <>
                    <Modal.Header title={ i18n._(t`Change category`) } onClose={ () => onCloseDialogToAdd(false) }/>
                    <ProductsChangeCategory onClose={  onCloseDialogToAdd } list={list}/>
                </>
            </Modal.Body>
        </Modal>
    );
};
