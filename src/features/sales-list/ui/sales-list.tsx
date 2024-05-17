import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { SalesListTable } from 'features/sales-list/ui/table/sales-table';
import { useGetCheckedSalesList } from '../hooks/use-get-checked-sales-list';
import { typeHeadersAction } from 'shared/ui/table/types/type';
import { Trans } from '@lingui/macro';

export const SalesList: React.FC = () => {

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
            />
        </>);

};
