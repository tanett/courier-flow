import React, { useState } from 'react';
import { useStoresList } from 'features/stores-list/hooks/use-stores-list';
import { useNavigate } from 'react-router-dom';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { routerPaths } from '../../../app/config/router-paths';
import { Modal } from '../../../shared/ui/modal';
import { Dialog } from '../../../shared/ui/dialog-new';
import { useSelectorT } from '../../../app/state';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editLimitedStoresPermissions } from 'app/config/permissions-config';
import { StoresListTable } from 'features/stores-list/ui/stores-table';
import { typeStore } from '../../../entities/stores/model/types';

export const StoresList: React.FC = () => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowedStoreEdit = useIsAllowedPermissions(editLimitedStoresPermissions);

    const {
        storesList,
        pagination,
        isLoading,
        setRefetch,
    } = useStoresList();


    const goToEditStorePage = (id: string | number) => navigate([ routerPaths.stores, id.toString(), 'edit' ].join('/'));

    const goToDetailsStorePage = (id: string | number, name: string) => navigate([ routerPaths.stores, id.toString(), name ].join('/'));

    return (
        <>
            <StoresListTable
                currentUser={ currentUser }
                isAllowedStoreEdit={ isAllowedStoreEdit }
                goToEditStorePage={ goToEditStorePage }
                storesList={ storesList }
                pagination={ pagination }
                isLoading={ isLoading }
                goToDetailsStorePage={ goToDetailsStorePage }
            />
        </>);

};
