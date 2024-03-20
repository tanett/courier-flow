import React from 'react';
import { useTerminalList } from '../hooks/use-terminal-list';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { typeTerminalExtended } from 'entities/terminals/model/types';
import { TerminalsTable } from 'features/terminal-list/ui/terminals-table';

export const TerminalList: React.FC = () => {

    const {
        terminalsList,
        pagination,
        isFetching,
    } = useTerminalList();

    const navigate = useNavigate();

    const goToDetailsTerminalPage = (item: typeTerminalExtended) => navigate([ routerPaths.terminals, item.id.toString(), item.serialNumber ].join('/'));

    return (
        <>
            <TerminalsTable
                goToDetailsTerminalPage={ goToDetailsTerminalPage }
                terminalsList={ terminalsList }
                pagination={ pagination }
                isFetching={ isFetching }
            />
        </>);

};
