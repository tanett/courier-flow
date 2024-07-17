import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { routerPaths } from '../../../app/config/router-paths';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editOrdersPermissions,  } from 'app/config/permissions-config';

import { typeHeadersAction } from 'shared/ui/table/types/type';
import { useGetCheckedOrdersList } from 'features/orders-list/hooks/use-get-checked-orders-list';
import { OrdersListTable } from 'features/orders-list/ui/table/orders-table';
import { typeOrdersShortWithCheckBox } from 'features/orders-list/types/types';
import { Modal } from 'shared/ui/modal';
import { Dialog } from 'shared/ui/dialog-new';
import { LoaderOverlay } from 'shared/ui/loader-overlay';


export const OrdersList: React.FC = () => {

    const navigate = useNavigate();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedEdit = useIsAllowedPermissions(editOrdersPermissions);

    const {
        ordersCheckedList,
        pagination,
        isLoading,
        handlers,
    } = useGetCheckedOrdersList();

    const [popupContent, setPopupContent] = useState<React.ReactNode | null>(null)

    // modal archive item product
    const [ modalArchiveItemData, setModalArchiveItemData ] = useState<null | typeOrdersShortWithCheckBox>(null);

    // modal archive selected product
    const [ isModalSelectedItemArchive, setIsModalSelectedItemArchive ] = useState(false);

    // modal change category selected product
    const [ isModalChangeCategorySelectedItem, setIsModalChangeCategorySelectedItem ] = useState(false);

    // export selected modals
    const [ isModalExportSelectedProducts, setIsModalExportSelectedProducts ] = useState(false);


    const onClickRowActionsArchiveItem = (product: typeOrdersShortWithCheckBox) => {

        setModalArchiveItemData(product);

    };


    const goToEditPage = (id: string | number) => navigate([ routerPaths.orders, routerPaths.orders_list, id.toString(), 'edit' ].join('/'));

    const goToDetailsPage = (id: string | number, name: string) => navigate([ routerPaths.orders, routerPaths.orders_list, id.toString(), name ].join('/'));



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
        <OrdersListTable
            currentUser={ currentUser }
            isAllowedEdit={ isAllowedEdit }
            goToEditPage={ goToEditPage }
            ordersList={ ordersCheckedList }
            pagination={ pagination }
            isLoading={ isLoading }
            goToDetailsPage={ goToDetailsPage }
            headerActions={ headerActions }
            handlersListState={handlers}
            setPopupContent={ setPopupContent }
        />

        { popupContent &&  <Modal modalWidth="auto" opened={ true } onCloseByOverlay={()=>setPopupContent(null)}>
            <Modal.Body >
                {popupContent}
            </Modal.Body>
        </Modal>}

        {/* { modalArchiveItemData && <ModalCancelOrder data={modalArchiveItemData} setOpen={setModalArchiveItemData}/> } */}

        {/* { isModalSelectedItemArchive && <ModalArchiveSelectedItem list={ordersCheckedList || []} setOpen={setIsModalSelectedItemArchive}/> } */}

        {/* { isModalChangeCategorySelectedItem && <ModalChangeCategorySelectedItem list={ordersCheckedList || []} setOpen={setIsModalChangeCategorySelectedItem}/> } */}

        {/* { isModalExportSelectedProducts && <ModalExportSelectedProduct list={ordersCheckedList || []} setOpen={setIsModalExportSelectedProducts}/> } */}

    </>);

};
