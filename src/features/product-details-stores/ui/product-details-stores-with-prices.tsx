import React, { useState } from 'react';
import { Box, Button, Flex, Tooltip, useMantineTheme } from '@mantine/core';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { TablePagination } from 'shared/ui/table/ui/table-pagination/table-pagination';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editRetailProductPermissions } from 'app/config/permissions-config';
import { IconPlus } from '@tabler/icons-react';
import { useGetRetailProductsList } from 'features/product-details-stores/hooks/use-get-retail-products-list';
import { typeRetailProduct } from '../../../entities/retail-products/model/types';
import {  TableDetailsStoresInProduct } from 'features/product-details-stores/ui/table/table-stores-in-product';
import { ModalDelete } from 'features/product-details-stores/ui/modal/modal-delete';
import { ModalAdd } from 'features/product-details-stores/ui/modal/modal-add';
import { ModalChangePrice } from 'features/product-details-stores/ui/modal/modal-change-price';

export const ProductDetailsStoresWithPrices: React.FC<{ productId: string }> = ({ productId }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const isAllowEditRetailProduct = useIsAllowedPermissions(editRetailProductPermissions);

    const {
        list,
        pagination,
        isLoading,
        setRefetch,
    } = useGetRetailProductsList();


// popup add store && price
    const [ dialogToAdd, setDialogToAdd ] = useState<boolean>(false);

    const onAddClick = () => {

        setDialogToAdd(true);

    };


    // popup delete store && price
    const [ dialogToDelete, setDialogToDelete ] = useState<null | typeRetailProduct>(null);

    const onOpenDialogToDelete = (id: string) => {

        if (list?.length) {

            const item = list.find(item => item.id === id);

            if (item) {

                setDialogToDelete(item);

            }

        }

    };

    // popup change price in store
    const [ dialogChangePrice, setDialogChangePrice ] = useState<null | typeRetailProduct>(null);


    const onOpenDialogChangePrice = (id: string) => {

        if (list?.length) {

            const item = list.find(item => item.id === id);

            if (item) {

                setDialogChangePrice(item);

            }

        }

    };


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
                onOpenDialogChangePriceRetailProduct={onOpenDialogChangePrice}
            />

            { pagination && <Flex py={ 16 }><TablePagination withPerPage={ pagination.totalPages > 1 } { ...pagination } /></Flex> }

            { dialogToDelete && <ModalDelete data={dialogToDelete} setOpen={setDialogToDelete}  setRefetch={setRefetch}/> }

            { dialogToAdd && <ModalAdd setOpen={setDialogToAdd} productId={productId} setRefetch={setRefetch}/> }

            { dialogChangePrice && <ModalChangePrice setOpen={setDialogChangePrice} data={dialogChangePrice} setRefetch={setRefetch}/> }
        </Box>);

};
