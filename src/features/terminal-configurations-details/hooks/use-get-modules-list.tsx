import { useEffect, useState } from 'react';
import { useGetAvailableModulesQuery } from '../../../entities/terminals-configurations/api/api';
import { AVAILABLE_MODULES, typeAvailableModulesTerminalConfigurations } from '../../../entities/terminals-configurations/model/state-slice';

export const useGetModulesList = (selectedModules: AVAILABLE_MODULES[]) => {

    const {
        data,
        isFetching
    } = useGetAvailableModulesQuery(undefined);

    const [ modules, setModules ] = useState<typeAvailableModulesTerminalConfigurations[] | undefined>(undefined);

    useEffect(() => {

        if (data) {

            const mappedModules = data.filter(item => selectedModules.includes(item.value));
            setModules(mappedModules);
        }

    }, [ data ]);

    return {
        modules,
        isLoading: isFetching ,
    };

};
