import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { routerPaths } from '../../../app/config/router-paths';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editProductsPermissions } from 'app/config/permissions-config';
import { ProductsListTable } from './table/products-table';
import { typeHeadersAction, typeProductExtendedWithCheckBox } from '../types/types';
import { ModalArchiveItem } from 'features/products-list/ui/modal/modal-archive-item';
import { ModalArchiveSelectedItem } from 'features/products-list/ui/modal/modal-archive-selected-item';
import { ModalChangeCategorySelectedItem } from 'features/products-list/ui/modal/modal-change-category-selected-item';
import { useGetCheckedProductsList } from 'features/products-list/hooks/use-get-checked-products-list';
import { ModalExportSelectedProduct } from 'features/products-list/ui/modal/modal-export-selected-product';


export const ProductsList: React.FC = () => {

    const navigate = useNavigate();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedEdit = useIsAllowedPermissions(editProductsPermissions);

    const {
        productsCheckedList,
        pagination,
        isLoading,
        handlers,
    } = useGetCheckedProductsList();

    // modal archive item product
    const [ modalArchiveItemData, setModalArchiveItemData ] = useState<null | typeProductExtendedWithCheckBox>(null);

    // modal archive selected product
    const [ isModalSelectedItemArchive, setIsModalSelectedItemArchive ] = useState(false);

    // modal change category selected product
    const [ isModalChangeCategorySelectedItem, setIsModalChangeCategorySelectedItem ] = useState(false);

    // export selected modals
    const [ isModalExportSelectedProducts, setIsModalExportSelectedProducts ] = useState(false);


    const onClickRowActionsArchiveItem = (product: typeProductExtendedWithCheckBox) => {

        setModalArchiveItemData(product);

    };


    const goToEditProductPage = (id: string | number) => navigate([ routerPaths.products, id.toString(), 'edit' ].join('/'));

    const goToDetailsProductPage = (id: string | number, name: string) => navigate([ routerPaths.products, id.toString(), name ].join('/'));


    const headerActions: typeHeadersAction[] = [

        {
            id: 'selected-export-btn',
            label: <Trans >Selected export</Trans>,
            handler: (event) => setIsModalExportSelectedProducts(true),
        },
        {
            id: 'change-category-btn',
            label: <Trans >Change category</Trans>,
            handler: (event) => setIsModalChangeCategorySelectedItem(true),
        },

        {
            id: 'selected-archive-btn',
            label: <Trans id={'action-archive'}>Archive</Trans>,
            handler: (event) => setIsModalSelectedItemArchive(true),
        }
    ];


    return (<>
        <ProductsListTable
            currentUser={ currentUser }
            isAllowedEdit={ isAllowedEdit }
            goToEditProductPage={ goToEditProductPage }
            onClickRowActionsArchiveItem={ onClickRowActionsArchiveItem }
            productsList={ productsCheckedList }
            pagination={ pagination }
            isLoading={ isLoading }
            goToDetailsProductPage={ goToDetailsProductPage }
            headerActions={ headerActions }
            handlersListState={handlers}
        />


        { modalArchiveItemData && <ModalArchiveItem data={modalArchiveItemData} setOpen={setModalArchiveItemData}/> }

        { isModalSelectedItemArchive && <ModalArchiveSelectedItem list={productsCheckedList || []} setOpen={setIsModalSelectedItemArchive}/> }

        { isModalChangeCategorySelectedItem && <ModalChangeCategorySelectedItem list={productsCheckedList || []} setOpen={setIsModalChangeCategorySelectedItem}/> }

        { isModalExportSelectedProducts && <ModalExportSelectedProduct list={productsCheckedList || []} setOpen={setIsModalExportSelectedProducts}/> }

    </>);

};
