import React, { useState } from 'react';
import { Button, Flex } from '@mantine/core';
import { useStyles } from './styles';
import { t, Trans } from '@lingui/macro';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { Modal } from '../../../shared/ui/modal';
import { i18n } from '@lingui/core';
import { typeModalContent } from '../types/type';
import { ButtonPanelMenu } from '../../../shared/ui/button-panel-menu';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { readSalesPermissions } from 'app/config/permissions-config';
import { SidebarTitle } from 'shared/ui/sidebar-title';
import { SidePanel } from 'shared/ui/side-panel';
import { ExportSalesList } from 'features/export-sales-list';
import { ExportSalesDialog } from 'features/sales-list-buttons-panel/ui/dialogs/export-sales-dialog';


export const SalesListButtonsPanel: React.FC = () => {


    const { classes } = useStyles();

    const [ modalContent, setModalContent ] = useState<null | typeModalContent>(null);
    const [ sidePanelContent, setSidePanelContent ] = useState<null | React.ReactNode>(null);
    const [ sidePanelTitle, setSidePanelTitle ] = useState<null | React.ReactNode>(null);

    const isAllowExportSales = useIsAllowedPermissions(readSalesPermissions);  // todo check it

    const onCloseModal = () => setModalContent(null);

    const onExport = () => {

        setModalContent({
            title: i18n._(t`Sales export`),
            content: <ExportSalesDialog/>,
        });

    };


    const onOpenExportsList = () => {

        setSidePanelTitle(<SidebarTitle><Trans>Export sales</Trans></SidebarTitle>);
        setSidePanelContent(<ExportSalesList/>);

    };

    return (<>
        <Flex className={classes.wrapper}>
            {isAllowExportSales && <Button
                variant="outline"
                color="gray"
                leftIcon={ <ArrowUpTrayIcon className={ classes.menuButtonIcon }/> }
                onClick={ onExport }
            >
                <Trans>Export</Trans>
            </Button> }

            <ButtonPanelMenu>
                <ButtonPanelMenu.MenuItem
                    label={i18n._(t`Exports list`)}
                    icon={<ArrowUpTrayIcon className={classes.menuButtonIcon}/>}
                    onClick={onOpenExportsList}
                />
            </ButtonPanelMenu>

        </Flex>

        <Modal opened={!!modalContent} modalWidth={'auto'}>
            <Modal.Header title={modalContent?.title} onClose={onCloseModal}/>
            <Modal.Body>
                {modalContent?.content}
            </Modal.Body>
        </Modal>

        <SidePanel
            title={sidePanelTitle ?? ''}
            isOpened={!!sidePanelContent}
            onClose={() => setSidePanelContent(null)}
        >
            {sidePanelContent}
        </SidePanel>
    </>);

};
