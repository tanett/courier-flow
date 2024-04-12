import React from 'react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { RetailProductEditPriceForAllStores } from 'features/retail-product-edit-price-for all-stores/retail-product-edit price-for-all-stores';

export const ModalAllPricesChange: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
    productId: string
}> = ({
    setOpen,
    setRefetch,
    productId
}) => {

    const { i18n } = useLingui();

    const onCloseDialog = (refetch: boolean) => {

        if (refetch) {

            setRefetch(true);

        }

        setOpen(false);

    };

    return (
        <Modal modalWidth="auto" opened={ true }  onCloseByOverlay={ () => onCloseDialog(false) }>
            <Modal.Body>
                <>
                    <Modal.Header title={ i18n._(t`Change price for all stores`) } onClose={ () => onCloseDialog(false) }/>
                    <RetailProductEditPriceForAllStores productId={productId} onClose={  onCloseDialog }/>
                </>
            </Modal.Body>
        </Modal>
    );
};
