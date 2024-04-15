import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mantine/core';
import { ArchiveBoxArrowDownIcon } from '@heroicons/react/24/outline';
import { t, Trans } from '@lingui/macro';
import { Dialog } from 'shared/ui/dialog/dialog';
import { useStyles } from './styles';
import { useArchiveProducts } from '../../entities/products/hooks/use-archive-products';
import { useIsAllowedPermissions } from '../../entities/users/hooks/use-is-allowed-permissions';
import { editProductsPermissions } from 'app/config/permissions-config';
import { useLingui } from '@lingui/react';

export const ProductArchiveButton: React.FC<{ id: string | undefined }> = ({ id }) => {

    const { classes } = useStyles();

    const {i18n} = useLingui()

    const isAllowDelete = useIsAllowedPermissions(editProductsPermissions);

    const navigate = useNavigate();

    const [ isOpenConfirm, setIsOpenConfirm ] = useState(false);

    const { onArchive } = useArchiveProducts({ onSuccess: () => navigate(-1) });

    return (isAllowDelete  ?
        <>
            <Button
                disabled={ !id }
                key={ 'archive-products' }
                variant={ 'outline' }
                className={ classes.button }
                onClick={ () => setIsOpenConfirm(true) }
                leftIcon={ <ArchiveBoxArrowDownIcon/> }><Trans id={'action-archive'}>Archive</Trans>
            </Button>

            { isOpenConfirm && <Dialog
                opened={ true }
                onClose={ () => setIsOpenConfirm(false) }
                withCloseButton={ false }
                confirmButton={ {
                    title: i18n._('action-archive'),
                    handler: () => {

                        if (id) onArchive([id]);

                    },
                } }
                cancelButton={ {
                    title: t`Cancel`,
                    handler: () => setIsOpenConfirm(false),
                } }
            >
                { t`Are you sure you want to archive the current product?` }
            </Dialog> }


        </>
        : <div/>
    );

};
