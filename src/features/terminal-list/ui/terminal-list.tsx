import React from 'react';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { typeTerminalExtended } from '../../../entities/terminals/model/types';
import { TerminalsTable } from 'features/terminal-list/ui/terminals-table';
import { useExtendedTerminalsList } from '../../../entities/terminals/hooks/use-extended-terminals-list';

export const TerminalList: React.FC = () => {

    const {
        extendedTerminalsList,
        pagination,
        isLoading,
    } = useExtendedTerminalsList();

    const navigate = useNavigate();

    const goToDetailsTerminalPage = (item: typeTerminalExtended) => navigate([ routerPaths.terminals, item.id.toString(), item.serialNumber ].join('/'));

    return (
        <>
            <TerminalsTable
                goToDetailsTerminalPage={ goToDetailsTerminalPage }
                terminalsList={ extendedTerminalsList }
                pagination={ pagination }
                isFetching={ isLoading }
            />
        </>);

};
