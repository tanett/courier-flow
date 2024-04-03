import React, { useState } from 'react';
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

export const ProductsList: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const [ confirmToArchiveData, setConfirmToArchiveData ] = useState<null | typeProduct>(null);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedEdit = useIsAllowedPermissions(editProductsPermissions);

    const onCloseConfirmToArchive = () => {

        setConfirmToArchiveData(null);

    };

    const onConfirmArchiveProduct = (id: string) => {

        if (productsList?.length) {

            const product = productsList.find(item => item.id === id);

            if (product) {

                setConfirmToArchiveData(product);

            }

        }

    };

    const {
        productsList,
        pagination,
        isLoading,
        setRefetch,
    } = useProductsList();


    const goToEditProductPage = (id: string | number) => navigate([ routerPaths.products, id.toString(), 'edit' ].join('/'));

    const goToDetailsProductPage = (id: string | number, name: string) => navigate([ routerPaths.products, id.toString(), name ].join('/'));

    const { onArchive } = useArchiveProducts({
        onSuccess: () => {

            onCloseConfirmToArchive();
            setRefetch(true);

        },
        onError: () => onCloseConfirmToArchive(),
    });


    return (<>
        <ProductsListTable
            currentUser={ currentUser }
            isAllowedEdit={ isAllowedEdit }
            goToEditProductPage={ goToEditProductPage }
            onConfirmArchiveProduct={ onConfirmArchiveProduct }
            productsList={productsList}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsProductPage={goToDetailsProductPage}
        />


        { confirmToArchiveData && <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseConfirmToArchive,
                    } }
                    confirmButton={ {
                        title: i18n._(t`Confirm`),
                        handler: () => onArchive(confirmToArchiveData?.id),
                    } }
                >
                    <Trans>Are you sure you want to archive<br/>the product</Trans> &quot;{ confirmToArchiveData.name }&quot;?
                </Dialog>
            </Modal.Body>
        </Modal> }

    </>);

};
