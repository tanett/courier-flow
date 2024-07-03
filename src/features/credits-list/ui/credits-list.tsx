import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { useCreditsList } from '../../../entities/credits/hooks/use-credits-list';
import { CreditsListTable } from 'features/credits-list/ui/table/credits-table';

export const CreditsList: React.FC = () => {

    const navigate = useNavigate();

    const {
        creditsList,
        pagination,
        isLoading,
    } = useCreditsList();


    const goToDetailsPage = (id: string | number) => navigate(generatePath(routerPaths.credits_details, {id:id}));

    return (
        <>
            <CreditsListTable
                goToDetailsPage={ goToDetailsPage }
                creditsList={ creditsList }
                pagination={ pagination }
                isLoading={ isLoading }
            />


        </>);

};
