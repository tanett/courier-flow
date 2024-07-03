import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { SalesListTable } from 'features/sales-list/ui/table/sales-table';
import { useGetCheckedSalesList } from '../hooks/use-get-checked-sales-list';
import { typeHeadersAction } from 'shared/ui/table/types/type';
import { Trans } from '@lingui/macro';
import { ModalExportSelectedSales } from 'features/sales-list/ui/modals/modal-export-selected-sales';
import { ModalPrintReceiptSale } from 'features/sales-list/ui/modals/modal-print-receipt';

export const SalesList: React.FC = () => {

    const navigate = useNavigate();

    const isAllowedExport = useIsAllowedPermissions([]);// todo add permission

    const {
        shortSalesCheckedList,
        pagination,
        isLoading,
        handlers
    } = useGetCheckedSalesList();

    // export selected modals
    const [ isModalExportSelectedSales, setIsModalExportSelectedSales ] = useState(false);


    const goToDetailsSalePage = (id: string | number, publicId: string | number) => navigate([ routerPaths.sales, id.toString(), publicId.toString()  ].join('/'));

    const headerActions: typeHeadersAction[] = [

        {
            id: 'selected-export-btn',
            label: <Trans>Selected export</Trans>,
            handler: (event) => setIsModalExportSelectedSales(true),
        },

    ];

    const [isOpenReceipt, setIsOpenReceipt] = useState< string | null>(null);

    const onOpenReceipt = (id: string) => setIsOpenReceipt( id );

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

            { isOpenReceipt && <ModalPrintReceiptSale setOpen={setIsOpenReceipt} id={isOpenReceipt} /> }

            {isModalExportSelectedSales && <ModalExportSelectedSales list={shortSalesCheckedList} setOpen={setIsModalExportSelectedSales}/> }
        </>);

};
