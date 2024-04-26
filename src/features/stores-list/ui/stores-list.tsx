import React from 'react';
import { useGetExtendedStoresList } from '../../../entities/stores/hooks/use-get-extended-stores-list';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editLimitedStoresPermissions } from 'app/config/permissions-config';
import { StoresListTable } from 'features/stores-list/ui/stores-table';

export const StoresList: React.FC = () => {

    const navigate = useNavigate();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedStoreEdit = useIsAllowedPermissions(editLimitedStoresPermissions);

    const {
        extendedStoresList,
        pagination,
        isLoading,
    } = useGetExtendedStoresList();


    const goToEditStorePage = (id: string | number) => navigate([ routerPaths.stores, id.toString(), 'edit' ].join('/'));

    const goToDetailsStorePage = (id: string | number, name: string) => navigate([ routerPaths.stores, id.toString(), name ].join('/'));
    const goToDetailsStoreTabUsers = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string | number, name: string) => {

        event.stopPropagation(); navigate([ routerPaths.stores, id.toString(), name, '?f=tab.users' ].join('/'));

    };

    return (
        <>
            <StoresListTable
                currentUser={ currentUser }
                isAllowedStoreEdit={ isAllowedStoreEdit }
                goToEditStorePage={ goToEditStorePage }
                goToDetailsStoreTabUsers={goToDetailsStoreTabUsers}
                storesList={ extendedStoresList }
                pagination={ pagination }
                isLoading={ isLoading }
                goToDetailsStorePage={ goToDetailsStorePage }
            />
        </>);

};
