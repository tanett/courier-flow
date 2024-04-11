import React from 'react';
import { typeRetailProduct } from '../../../../entities/retail-products/model/types';
import { useDeleteRetailProductMutation } from '../../../../entities/retail-products/api/api';
import { notificationActions } from '../../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { t, Trans } from '@lingui/macro';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { useLingui } from '@lingui/react';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { LoaderOverlay } from 'shared/ui/loader-overlay';

export const ModalDelete: React.FC<{
    setOpen: React.Dispatch<React.SetStateAction<typeRetailProduct | null>>,
    data: typeRetailProduct
    setRefetch: React.Dispatch<React.SetStateAction<boolean>>
}> = ({
    setOpen,
    data,
    setRefetch
}) => {

    const dispatchAppT = useAppDispatchT();

    const { i18n } = useLingui();

    const [ deleteRetailProduct, { isLoading: isLoadingDeleteRetailProduct } ] = useDeleteRetailProductMutation();

    const onCloseDialogToDelete = () => { setOpen(null); };


    const onConfirmDelete= async (product: typeRetailProduct) => {

        try {

            await deleteRetailProduct([product.id]).unwrap();

            dispatchAppT(notificationActions.addNotification({
                type: NOTIFICATION_TYPES.SUCCESS,
                message: i18n._(t`Operation was successful.`),
            }));

            onCloseDialogToDelete();
            setRefetch(true);


        } catch (err) {

            errorHandler(err as typeResponseError, 'onDeleteRetailProduct', dispatchAppT);

        }

    };

    return (
        <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseDialogToDelete,
                    } }
                    confirmButton={ {
                        title: i18n._(t`Delete`),
                        handler: () => onConfirmDelete(data),
                    } }
                >
                    <Trans>Are you sure you want to delete <br/>the product</Trans>  &quot;{ data.product.name }&quot;  from the store?
                </Dialog>
                { isLoadingDeleteRetailProduct && <LoaderOverlay/> }
            </Modal.Body>
        </Modal>
    );
};
