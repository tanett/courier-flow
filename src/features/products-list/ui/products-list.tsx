import React, { useEffect, useState } from 'react';
import { useProductsList } from 'features/products-list/hooks/use-products-list';
import { useNavigate } from 'react-router-dom';
import { Trans } from '@lingui/macro';
import { routerPaths } from '../../../app/config/router-paths';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editProductsPermissions } from 'app/config/permissions-config';
import { ProductsListTable } from './table/products-table';
import { typeHeadersAction, typeProductExtendedWithCheckBox } from '../types/types';
import { useListState } from '@mantine/hooks';
import { ModalArchiveItem } from 'features/products-list/ui/modal/modal-archive-item';
import { ModalArchiveSelectedItem } from 'features/products-list/ui/modal/modal-archive-selected-item';
import { ModalChangeCategorySelectedItem } from 'features/products-list/ui/modal/modal-change-category-selected-item';


export const ProductsList: React.FC = () => {

    const navigate = useNavigate();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedEdit = useIsAllowedPermissions(editProductsPermissions);

    const {
        productsList,
        pagination,
        isLoading,
        setRefetch,
    } = useProductsList();

    // product list with checked
    const [ values, handlers ] = useListState<typeProductExtendedWithCheckBox>(undefined);

    useEffect(() => {

        if (productsList) {

            handlers.setState(productsList.map(item => ({
                ...item,
                checked: false,
            })));

        }

    }, [ productsList ]);

    // modal archive item product
    const [ modalArchiveItemData, setModalArchiveItemData ] = useState<null | typeProductExtendedWithCheckBox>(null);

    // modal archive selected product
    const [ isModalSelectedItemArchive, setIsModalSelectedItemArchive ] = useState(false);

    // modal change category selected product
    const [ isModalChangeCategorySelectedItem, setIsModalChangeCategorySelectedItem ] = useState(false);

    const onClickRowActionsArchiveItem = (product: typeProductExtendedWithCheckBox) => {

        setModalArchiveItemData(product);

    };


    const goToEditProductPage = (id: string | number) => navigate([ routerPaths.products, id.toString(), 'edit' ].join('/'));

    const goToDetailsProductPage = (id: string | number, name: string) => navigate([ routerPaths.products, id.toString(), name ].join('/'));


    const headerActions: typeHeadersAction[] = [

        {
            id: 'selected-export-btn',
            label: <Trans >Selected export</Trans>,
            handler: (event) => console.log('click'),
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
            productsList={ values }
            pagination={ pagination }
            isLoading={ isLoading }
            goToDetailsProductPage={ goToDetailsProductPage }
            headerActions={ headerActions }
            handlersListState={handlers}
        />


        { modalArchiveItemData && <ModalArchiveItem data={modalArchiveItemData} setRefetch={setRefetch} setOpen={setModalArchiveItemData}/> }

        { isModalSelectedItemArchive && <ModalArchiveSelectedItem list={values || []} setRefetch={setRefetch} setOpen={setIsModalSelectedItemArchive}/> }

        { isModalChangeCategorySelectedItem && <ModalChangeCategorySelectedItem list={values || []} setRefetch={setRefetch} setOpen={setIsModalChangeCategorySelectedItem}/> }

    </>);

};
