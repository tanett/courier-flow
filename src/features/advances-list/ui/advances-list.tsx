import React, { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { AdvancesListTable } from 'features/advances-list/ui/table/advances-table';
import { useShortAdvancesList } from '../../../entities/advances/hooks/use-short-advances-list';
import { ModalPrintReceiptAdvance } from 'features/advances-list/ui/modals/modal-print-receipt';

export const AdvancesList: React.FC = () => {

    const navigate = useNavigate();

    const {
        shortAdvancesList,
        pagination,
        isLoading,
    } = useShortAdvancesList();


    const goToDetailsPage = (id: string | number) => navigate(generatePath(routerPaths.advances_details, {id:id}));

    const [isOpenReceipt, setIsOpenReceipt] = useState< string | number | null>(null);

    const onOpenReceipt = (id: string | number) => setIsOpenReceipt( id );

    return (
        <>
            <AdvancesListTable
                goToDetailsPage={ goToDetailsPage }
                advancesList={ shortAdvancesList }
                pagination={ pagination }
                isLoading={ isLoading }
                onOpenReceipt={ onOpenReceipt }
            />

            { isOpenReceipt && <ModalPrintReceiptAdvance setOpen={setIsOpenReceipt} id={isOpenReceipt} /> }

        </>);

};
