import React, { useEffect, useState } from 'react';
import { useProductsList } from 'features/products-list/hooks/use-products-list';
import { useNavigate } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { routerPaths } from '../../../app/config/router-paths';
import { Modal } from '../../../shared/ui/modal';
import { Dialog } from '../../../shared/ui/dialog-new';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editProductsPermissions } from 'app/config/permissions-config';
import { typeProduct } from '../../../entities/products/model/state-slice/types';
import { useArchiveProducts } from '../../../entities/products/hooks/use-archive-products';
import { ProductsListTable } from './table/products-table';
import { typeProductWithCheckBox, typeHeadersAction } from '../types/types';
import { useListState } from '@mantine/hooks';


export const ProductsList: React.FC = () => {

    const { i18n } = useLingui();

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
    const [ values, handlers ] = useListState<typeProductWithCheckBox>(undefined);

    useEffect(() => {

        if (productsList) {

            handlers.setState(productsList.map(item => ({
                ...item,
                checked: false,
            })));

        }

    }, [ productsList ]);

    // modals
    const [ modalArchiveItemData, setModalArchiveItemData ] = useState<null | typeProduct>(null);
    const [ isOpenModalSelectedItemArchive, setIsOpenSelectedItemArchive ] = useState(false);


    const onCloseModalToArchiveItem = () => {

        setModalArchiveItemData(null);

    };

    const onClickRowActionsArchiveItem = (product: typeProductWithCheckBox) => {

        setModalArchiveItemData(product);

    };


    const goToEditProductPage = (id: string | number) => navigate([ routerPaths.products, id.toString(), 'edit' ].join('/'));

    const goToDetailsProductPage = (id: string | number, name: string) => navigate([ routerPaths.products, id.toString(), name ].join('/'));

    const { onArchive } = useArchiveProducts({
        onSuccess: () => {

            if (modalArchiveItemData) onCloseModalToArchiveItem();
            if (isOpenModalSelectedItemArchive) setIsOpenSelectedItemArchive(false);
            setRefetch(true);

        },
        onError: () => {

            if (modalArchiveItemData) onCloseModalToArchiveItem();
            if (isOpenModalSelectedItemArchive) setIsOpenSelectedItemArchive(false);

        },
    });

    const headerActions: typeHeadersAction[] = [

        {
            id: 'selected-export-btn',
            label: <Trans >Selected export</Trans>,
            handler: (event) => console.log('click'),
        },
        {
            id: 'change-category-btn',
            label: <Trans >Change category</Trans>,
            handler: (event) => console.log('click'),
        },

        {
            id: 'selected-archive-btn',
            label: <Trans id={'action-archive'}>Archive</Trans>,
            handler: (event) => setIsOpenSelectedItemArchive(true),
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


        { modalArchiveItemData && <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseModalToArchiveItem,
                    } }
                    confirmButton={ {
                        title: i18n._(t`Confirm`),
                        handler: () => onArchive(modalArchiveItemData?.id),
                    } }
                >
                    <Trans>Are you sure you want to archive<br/>the product</Trans> &quot;{ modalArchiveItemData.name }&quot;?

                </Dialog>
            </Modal.Body>
        </Modal> }

    </>);

};
