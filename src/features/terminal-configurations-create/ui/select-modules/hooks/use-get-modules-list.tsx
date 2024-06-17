import { useGetAvailableModulesQuery } from '../../../../../entities/terminals-configurations/api/api';

export const useGetModulesList = () => {

    const {
        data,
        isFetching
    } = useGetAvailableModulesQuery(undefined);


    return {
        data,
        isLoading: isFetching ,
    };

};
