import React, { useState } from 'react';
import { Box, Button, Flex, Tooltip, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TablePagination } from 'shared/ui/table/ui/table-pagination/table-pagination';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editRetailProductPermissions } from 'app/config/permissions-config';
import { IconPlus } from '@tabler/icons-react';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useAppDispatchT } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { routerPaths } from 'app/config/router-paths';
import { useNavigate } from 'react-router-dom';
import { useGetRetailProductsList } from 'features/product-details-stores/hooks/use-get-retail-products-list';
import { useDeleteRetailProductMutation, usePatchRetailProductMutation } from '../../../entities/retail-products/api/api';
import { typeRetailProduct } from '../../../entities/retail-products/model/types';
import {  TableDetailsStoresInProduct } from 'features/product-details-stores/ui/table/table-stores-in-product';
import { AddRetailProductToStore } from 'features/add-retail-product-to-store/add-retail-product-to-store';

export const ProductDetailsStoresWithPrices: React.FC<{ productId: string }> = ({ productId }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const dispatchAppT = useAppDispatchT();

    const navigate = useNavigate();

    const isAllowEditRetailProduct = useIsAllowedPermissions(editRetailProductPermissions);

    const {
        list,
        pagination,
        isLoading,
        setRefetch,
    } = useGetRetailProductsList();

    const [ editRetailProduct, { isLoading: isLoadingEditRetailProduct } ] = usePatchRetailProductMutation();
    const [ deleteRetailProduct, { isLoading: isLoadingDeleteRetailProduct } ] = useDeleteRetailProductMutation();


    const [ dialogToAdd, setDialogToAdd ] = useState<boolean>(false);

    const onAddClick = () => {

        setDialogToAdd(true);

    };
    const onCloseDialogToAdd = (refetch: boolean) => {

        if (refetch) {

            setRefetch(true);

        }

        setDialogToAdd(false);

    };


    const [ dialogToDelete, setDialogToDelete ] = useState<null | typeRetailProduct>(null);

    const onCloseDialogToDelete = () => {

        setDialogToDelete(null);

    };

    const onOpenDialogToDelete = (id: string) => {

        if (list?.length) {

            const item = list.find(item => item.id === id);

            if (item) {

                setDialogToDelete(item);

            }

        }

    };

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

    const goToEditUserPage = (id: string | number) => navigate([ routerPaths.users, id.toString(), 'edit' ].join('/'));

    return (
        <Box sx={ {
            borderTop: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
            borderTopRightRadius: '8px',
            marginTop: '-1px',
            backgroundColor: theme.white,

        } }>

            <Flex justify={ 'space-between' } p={ 16 }
                sx={ {
                    borderLeft: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderRight: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
                    borderTopRightRadius: '8px',
                } }
            >
                { (list && pagination && pagination.totalElements > 0) ? <Box sx={ {
                    borderBottom: `2px solid ${ theme.colors.gray[ 5 ] }`,
                    alignSelf: 'center',
                } }>{ i18n._(t`total`) }: { pagination?.totalElements || 0 }</Box> : <div/> }

                { isAllowEditRetailProduct && <Tooltip withArrow arrowSize={ 6 } openDelay={ 1500 } radius="md" label={ i18n._(t`Add an existing employee to store`) }><Button
                    variant={ 'outline' }
                    key={ 'add-user-in-store' }
                    sx={ {
                        fontWeight: 700,
                        fontSize: theme.fontSizes.md,
                        letterSpacing: '0.3px',
                        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
                    } }
                    onClick={ onAddClick }
                    leftIcon={ <IconPlus size={ 20 }/> }><Trans>Add</Trans>
                </Button></Tooltip> }
            </Flex>

            <TableDetailsStoresInProduct
                retailProductList={ list }
                isLoading={ isLoading }
                setRefetchList={ setRefetch }
                onOpenDialogDeleteRetailProduct={ onOpenDialogToDelete }
                isAllowEditProduct={ isAllowEditRetailProduct }
                onOpenDialogChangePriceRetailProduct={onOpenDialogToDelete}
            />

            { pagination && <Flex py={ 16 }><TablePagination withPerPage={ pagination.totalPages > 1 } { ...pagination } /></Flex> }

            { dialogToDelete && <Modal modalWidth="dialog" opened={ true }>
                <Modal.Body>
                    <Dialog
                        cancelButton={ {
                            title: i18n._(t`Cancel`),
                            handler: onCloseDialogToDelete,
                        } }
                        confirmButton={ {
                            title: i18n._('action-archive'),
                            handler: () => onConfirmDelete(dialogToDelete),
                        } }
                    >
                        <Trans>Are you sure you want to delete <br/>the product</Trans>  &quot;{ dialogToDelete.product.name }&quot;  from the store?
                    </Dialog>
                    { isLoadingDeleteRetailProduct && <LoaderOverlay/> }
                </Modal.Body>
            </Modal> }

            { dialogToAdd && <Modal modalWidth="auto" opened={ true } onCloseByOverlay={ () => onCloseDialogToAdd(false) }>
                <Modal.Body>
                    <>
                        <Modal.Header title={ i18n._(t`Add a store`) } onClose={ () => onCloseDialogToAdd(false) }/>
                        <AddRetailProductToStore productId={ productId } onClose={  onCloseDialogToAdd }/>
                    </>
                </Modal.Body>
            </Modal> }
        </Box>);

};
