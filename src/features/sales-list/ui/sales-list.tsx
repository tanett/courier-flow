import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { SalesListTable } from 'features/sales-list/ui/table/sales-table';
import { useGetCheckedSalesList } from '../hooks/use-get-checked-sales-list';
import { typeHeadersAction } from 'shared/ui/table/types/type';
import { t, Trans } from '@lingui/macro';
import { Modal } from 'shared/ui/modal';
import { Button, Flex, rem } from '@mantine/core';
import { useLingui } from '@lingui/react';

export const SalesList: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const isAllowedExport = useIsAllowedPermissions([]);

    const {
        shortSalesCheckedList,
        pagination,
        isLoading,
        handlers
    } = useGetCheckedSalesList();

    // export selected modals
    const [ isModalExportSelectedProducts, setIsModalExportSelectedProducts ] = useState(false);


    const goToDetailsSalePage = (id: string | number, publicId: string | number) => navigate([ routerPaths.sales, id.toString(), publicId.toString()  ].join('/'));

    const headerActions: typeHeadersAction[] = [

        {
            id: 'selected-export-btn',
            label: <Trans>Selected export</Trans>,
            handler: (event) => setIsModalExportSelectedProducts(true),
        },

    ];

    const [isOpenReceipt, setIsOpenReceipt] = useState<{id: string | number} | null>(null);

    const onOpenReceipt = (id: string | number) => setIsOpenReceipt({id: id});

    const onCloseReceipt = () => setIsOpenReceipt(null);

    return (
        <>
            <SalesListTable
                goToDetailsSalePage={ goToDetailsSalePage }
                salesList={ shortSalesCheckedList }
                pagination={ pagination }
                isLoading={ isLoading }
                headerActions={ headerActions }
                handlersListState={ handlers }
                isAllowedExport={ isAllowedExport }
                onOpenReceipt={ onOpenReceipt }
            />
            { isOpenReceipt && <Modal modalWidth="dialog" opened={ true } onCloseByOverlay={onCloseReceipt}>
                <Modal.Body>
                    <Modal.Header title={i18n._(t`Receipt`)} onClose={onCloseReceipt}/>
                    <Modal.Body>
                        receipt
                        <Flex sx = {{
                            alignItems: 'center',
                            gap: rem(24),
                            justifyContent: 'center',
                        }}>
                            <Button variant='outline' onClick={onCloseReceipt}><Trans>Close</Trans></Button>
                            <Button><Trans>Print</Trans></Button>
                        </Flex>
                    </Modal.Body>
                </Modal.Body>
            </Modal> }
        </>);

};
