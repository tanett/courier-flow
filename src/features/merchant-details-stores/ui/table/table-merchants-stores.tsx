import React, { useState } from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useLingui } from '@lingui/react';
import { t, Trans } from '@lingui/macro';
import { useLocation, useNavigate } from 'react-router-dom';
import { dialogVariant, typeTableDialog } from 'shared/ui/table/types/type';
import { Dialog } from 'shared/ui/dialog/dialog';
import { dialogIcon } from 'shared/ui/dialog/types';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';
import { TableSkeleton } from 'shared/ui/table/ui/table-skeleton/tableSkeleton';
import { typeStore } from 'entities/stores/model/types';
import { EmptyElement } from 'shared/ui/empty-element';
import { useSelectorT } from 'app/state';
import { useIsAllowedPermissions } from 'entities/users/hooks/use-is-allowed-permissions';
import { typeAction } from 'shared/ui/table/ui/table-actions/types';
import { Table } from 'shared/ui/table/ui/table-new/table';
import { editLimitedStoresPermissions } from 'app/config/permissions-config';


export const TableDetailsStores: React.FC<{ storeList: typeStore[] | undefined, isLoading: boolean, setRefetchList: React.Dispatch<React.SetStateAction<boolean>> }> = ({
    storeList,
    isLoading,
    setRefetchList,
}) => {

    const { i18n } = useLingui();

    const navigate = useNavigate();

    const theme = useMantineTheme();

    const location = useLocation();

    const currentUser = useSelectorT(state => state.userProfile.userProfile);

    const isAllowEditStore = useIsAllowedPermissions(editLimitedStoresPermissions);

    const [ dialog, setDialog ] = useState<null | typeTableDialog>(null);

    const goToDetailsStorePage = (id: string | number, name: string) => navigate([ location.pathname, id.toString(), name ].join('/'));
    const goToEditStorePage = (id: string | number) => navigate([ location.pathname, id.toString(), 'edit' ].join('/'));


    const onOpenConfirmDialog = ({
        variant,
        buttons,
        message,
        handler,
    }: { variant: dialogVariant, buttons: { confirmTitle?: string, cancelTitle?: string } | undefined, message: string, handler: () => void }) => {

        let dgVariant = dialogIcon.attention;
        if (variant === dialogVariant.warning) dgVariant = dialogIcon.attention;

        const dialogProps: typeTableDialog = {
            variant: dgVariant,
            message: message,
            cancelButton: buttons?.cancelTitle ? {
                title: buttons.cancelTitle,
                handler: () => setDialog(null),
            } : undefined,
            confirmButton: buttons?.confirmTitle
                ? {
                    title: buttons.confirmTitle,
                    handler: () => {

                        handler();
                        setDialog(null);

                    },
                }
                : undefined,
        };

        setDialog(dialogProps);

    };

    return (
        <>
            { (isLoading || !storeList)
                ? <TableSkeleton/>
                : storeList.length === 0
                    ? <EmptyElement
                        title1={ i18n._(t`The list of stores is empty.`) }
                        title2={ i18n._(t`Click the Add button to create a new store.`) }/>
                    : storeList && <>
                        <Table variant="inTab">
                            <Table.Header>
                                <Table.Th withoutLeftDivider>
                                    <Trans>Name</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Address</Trans>
                                </Table.Th>
                                <Table.Th>
                                    <Trans>Phone number</Trans>
                                </Table.Th>
                                <Table.Th align={'center'}>
                                    <Flex maw={150}><Trans>Actions</Trans></Flex>
                                </Table.Th>
                            </Table.Header>

                            <Table.Body>
                                { storeList.map((item) => {

                                    const actions: typeAction[] = [
                                        {
                                            icon: <PencilSquareIcon width={ 22 }/>,
                                            handler: () => goToEditStorePage(item.id),
                                            label: i18n._(t`Edit`),
                                        }
                                    ];


                                    return (
                                        <Table.Tr key={ item.id } handler={() => goToDetailsStorePage(item.id, item.name)}>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item.name }</Box></Table.Td>
                                            <Table.Td><Box maw={400} sx={{ wordBreak: 'break-all' }}>{ item.address ?? '-' }</Box></Table.Td>
                                            <Table.Td><Box miw={150} maw={250}>{ item.phoneNumber ? formatIncompletePhoneNumber(item.phoneNumber) : '-' }</Box></Table.Td>
                                            { isAllowEditStore && <Flex justify={'center'}><Table.TdActions align={'center'} actions={ actions }/></Flex> }
                                        </Table.Tr>
                                    );

                                }) }
                            </Table.Body>
                        </Table>
                        { dialog && <Dialog
                            opened={ true }
                            onClose={ dialog.cancelButton?.handler }
                            withCloseButton={ false }
                            confirmButton={ dialog.confirmButton }
                            cancelButton={ dialog.cancelButton }
                        >
                            { dialog.message }
                        </Dialog> }
                    </>
            }
        </>
    );

};
