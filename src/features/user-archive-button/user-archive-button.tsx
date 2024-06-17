import React, { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { Button, Loader } from '@mantine/core';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';
import { t, Trans } from '@lingui/macro';
import { Dialog } from 'shared/ui/dialog/dialog';
import { useArchiveUsers } from '../../entities/users/hooks/use-archive-users';
import { useStyles } from './styles';
import { useSelectorT } from 'app/state';
import { useLingui } from '@lingui/react';
import useGetUserDataByIdFromUrl from '../../entities/users/hooks/use-get-user-data-by-id-from-url';

export const UserArchiveButton: React.FC<{ id: string | undefined }> = ({ id }) => {

    const { classes } = useStyles();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const {
        userData,
        isUserFetching,
    } = useGetUserDataByIdFromUrl();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const [ isOpenConfirm, setIsOpenConfirm ] = useState(false);

    const { onArchive } = useArchiveUsers({ onSuccess: () => navigate(generatePath(routerPaths.users), { replace: true }) });

    return (currentUser && currentUser.actor.id !== id ?
        <>
            <Button
                disabled={ !id }
                key={ 'archive-user' }
                variant={ 'outline' }
                className={ classes.button }
                onClick={ () => setIsOpenConfirm(true) }
                leftIcon={isUserFetching ? <Loader size={'sm'}/> : <ArchiveBoxArrowDownIcon/> }>
                <Trans>Move to archive</Trans>
            </Button>

            { isOpenConfirm && <Dialog
                opened={ true }
                onClose={ () => setIsOpenConfirm(false) }
                withCloseButton={ false }
                confirmButton={ {
                    title: i18n._('action-archive'),
                    handler: () => {

                        if (id) onArchive(id);

                    },
                } }
                cancelButton={ {
                    title: t`Cancel`,
                    handler: () => setIsOpenConfirm(false),
                } }
            >
                { t`Are you sure you want to archive the user ${userData?.fullName || 'the current user' }?` }
            </Dialog> }


        </>
        : <div/>
    );

};
