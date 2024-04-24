import React, { useState } from 'react';
import { Button, Flex } from '@mantine/core';
import { useStyles } from './styles';
import { t, Trans } from '@lingui/macro';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { Modal } from '../../../shared/ui/modal';
import { i18n } from '@lingui/core';
import { typeModalContent } from '../types/type';
import { ButtonPanelMenu } from '../../../shared/ui/button-panel-menu';
import { CreateButtonFilled } from 'shared/ui/create-button-filled/create-button-filled';
import { routerPaths } from 'app/config/router-paths';
import { useNavigate } from 'react-router-dom';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { addProductsPermissions } from 'app/config/permissions-config';
import { ProductChangeVatForAll } from 'features/product-change-vat-fo-all/product-change-vat-for-all';
import { ProductsImport } from 'features/products-import';
import { SidebarTitle } from 'shared/ui/sidebar-title';
import { ImportProductsList } from 'features/import-products-list';
import { SidePanel } from 'shared/ui/side-panel';
import { ExportProductsList } from 'features/export-products-list';
import { ProductsExport } from 'features/products-export';


export const ProductsListButtonsPanel: React.FC = () => {


    const { classes } = useStyles();

    const [ modalContent, setModalContent ] = useState<null | typeModalContent>(null);
    const [ sidePanelContent, setSidePanelContent ] = useState<null | React.ReactNode>(null);
    const [ sidePanelTitle, setSidePanelTitle ] = useState<null | React.ReactNode>(null);

    const navigate = useNavigate();

    const isAllowAddProduct = useIsAllowedPermissions(addProductsPermissions);

    const onCloseModal = () => setModalContent(null);

    const onChangeVat= () => {

        setModalContent({
            title: i18n._(t`Change VAT`),
            content: <ProductChangeVatForAll onClose={onCloseModal}/>,
        });

    };
    const onImport= () => {

        setModalContent({
            title: i18n._(t`Products import`),
            content: <ProductsImport />,
        });

    };

    const onExport= () => {

        setModalContent({
            title: i18n._(t`Products export`),
            content: <ProductsExport />,
        });

    };

    const onCreateNewProduct = () => {

        navigate(routerPaths.products_create);

    };

    const onOpenImportList = () => {

        setSidePanelTitle(<SidebarTitle><Trans>Import terminals</Trans></SidebarTitle>);
        setSidePanelContent(<ImportProductsList onTitleChange={setSidePanelTitle}/>);

    };

    const onOpenExportsList = () => {

        setSidePanelTitle(<SidebarTitle><Trans>Export products</Trans></SidebarTitle>);
        setSidePanelContent(<ExportProductsList/>);

    };

    return (<>
        <Flex className={classes.wrapper}>
            <Button
                variant="outline"
                color="gray"
                leftIcon={<ArrowDownTrayIcon className={classes.menuButtonIcon}/>}
                onClick={onImport}
            >
                <Trans>Import</Trans>
            </Button>
            <Button
                variant="outline"
                color="gray"
                leftIcon={<ArrowUpTrayIcon className={classes.menuButtonIcon}/>}
                onClick={onExport}
            >
                <Trans>Export</Trans>
            </Button>
            {isAllowAddProduct && <CreateButtonFilled
                id={ 'create-new-product' }
                handler={ onCreateNewProduct }
            /> }

            <ButtonPanelMenu>
                <ButtonPanelMenu.MenuItem
                    label={i18n._(t`Exports list`)}
                    icon={<ArrowUpTrayIcon className={classes.menuButtonIcon}/>}
                    onClick={onOpenExportsList}
                />
                <ButtonPanelMenu.MenuItem
                    label={i18n._(t`Imports list`)}
                    icon={<ArrowDownTrayIcon className={classes.menuButtonIcon}/>}
                    onClick={onOpenImportList}
                />
                <ButtonPanelMenu.MenuItem
                    label={i18n._(t`Change vat`)}
                    icon={<ReceiptPercentIcon className={classes.menuButtonIcon}/>}
                    onClick={onChangeVat}
                    primaryColor={true}
                />
                {/* <ButtonPanelMenu.MenuItem */}
                {/*     label={i18n._(t`Archive`)} */}
                {/*     icon={ <ArchiveBoxXMarkIcon className={cn([ classes.menuButtonIcon, classes.colorPrimary5 ]) } />} */}
                {/*     onClick={onArchive} */}
                {/*     primaryColor={true} */}
                {/* /> */}
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
