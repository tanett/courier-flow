import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { plural, t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { routerPaths } from '../../../app/config/router-paths';
import { Modal } from '../../../shared/ui/modal';
import { Dialog } from '../../../shared/ui/dialog-new';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { editTerminalConfigurationsPermissions,  } from 'app/config/permissions-config';
import { useTerminalConfigurationsList } from '../../../entities/terminals-configurations/hooks/use-terminal-configurations-list';
import { typeTerminalConfigurations } from '../../../entities/terminals-configurations/model/state-slice';
import { TerminalConfigurationsListTable } from 'features/terminal-configurations-list/ui/terminal-configurations-table';
import { useDeleteTerminalConfiguration } from '../../../entities/terminals-configurations/hooks/use-delete-terminal-configuration';
import { Box, useMantineTheme } from '@mantine/core';

export const TerminalConfigurationsList: React.FC = () => {

    const { i18n } = useLingui();

    const theme=useMantineTheme()

    const navigate = useNavigate();

    const [ modalWithData, setModalWithData ] = useState<null | typeTerminalConfigurations>(null);

    const isAllowedEdit = useIsAllowedPermissions(editTerminalConfigurationsPermissions);

    const onCloseModal = () => {

        setModalWithData(null);

    };

    const onDeleteButtonClick = (id: string) => {

        if (list?.length) {

            const resp = list.find(item => item.id === id);

            if (resp) {

                setModalWithData(resp);

            }

        }

    };

    const {
        list,
        pagination,
        isLoading,
    } = useTerminalConfigurationsList();


    const goToEditPage = (id: string | number) => navigate( routerPaths.terminals_configurations_edit.replace(':id', id.toString()));

    const goToDetailsPage = (id: string | number, name: string) => navigate([ routerPaths.terminals_configurations, id.toString(), name ].join('/'));

    const { onDelete} = useDeleteTerminalConfiguration({
        onSuccess: () => {

            onCloseModal();

        },
        onError: () => onCloseModal(),
    });


    return (<>
        <TerminalConfigurationsListTable
            isAllowedEdit={ isAllowedEdit }
            goToEditPage={ goToEditPage }
            onDeleteButtonHandler={ onDeleteButtonClick }
            list={list}
            pagination={pagination}
            isLoading={isLoading}
            goToDetailsPage={goToDetailsPage}
        />


        { modalWithData && <Modal modalWidth="dialog" opened={ true }>
            <Modal.Body>
                <Dialog
                    withoutPadding={true}
                    cancelButton={ {
                        title: i18n._(t`Cancel`),
                        handler: onCloseModal,
                    } }
                    confirmButton={ {
                        title: i18n._(t`Delete`),
                        handler: () => onDelete(modalWithData.id),
                    } }
                >
                    <Box sx={{fontWeight:500, }} ><Trans>Are you sure you want to delete the configuration</Trans><br/> &quot;{ modalWithData.name }&quot;?</Box>
                    <Box sx={{fontSize: theme.fontSizes.sm}}><Trans>By deleting this configuration, {plural(modalWithData.terminalIds.length, {
                        one: '# terminal',
                        few: '# terminals',
                        other: '# terminals',
                    }) } and {plural(modalWithData.storeIds.length, {
                        one: '# store',
                        few: '# stores',
                        other: '# stores',
                    }) } will remain without configurations.
                        <br/>A deleted configuration cannot be restored.</Trans></Box>
                </Dialog>
            </Modal.Body>
        </Modal> }

    </>);

};
