import React from 'react';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { RetailProductAddToStore } from 'features/retail-product-add-to-store/retail-product-add-to-store';
import { typeRetailProduct } from 'entities/retail-products/model/types';
import { RetailProductEditPrice } from 'features/retail-product-edit-price/retail-product-edit price';

export const ModalChangePrice: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<typeRetailProduct | null>>,
    data: typeRetailProduct
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    setOpen,
    data,
    setRefetch
}) => {

    const { i18n } = useLingui();

    const onCloseDialogChangePrice = (refetch: boolean) => {

        if (refetch) {

            setRefetch(true);

        }

        setOpen(null);

    };

    return (
        <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ () => onCloseDialogChangePrice(false) }>
            <Modal.Body>
                <>
                    <Modal.Header title={ i18n._(t`Change price`) } onClose={ () => onCloseDialogChangePrice(false) }/>
                    <RetailProductEditPrice data={ data } onClose={  onCloseDialogChangePrice }/>
                </>
            </Modal.Body>
        </Modal>
    );
};
