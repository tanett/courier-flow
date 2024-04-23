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


export const ProductsListButtonsPanel: React.FC = () => {


    const { classes } = useStyles();

    const [ modalContent, setModalContent ] = useState<null | typeModalContent>(null);

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
            content: <ProductsImport onClose={onCloseModal} />,
        });

    };

    const onCreateNewProduct = () => {

        navigate(routerPaths.products_create);

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
                onClick={() => console.log('Export')}
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
                    onClick={() => console.log('export list`')}
                />
                <ButtonPanelMenu.MenuItem
                    label={i18n._(t`Imports list`)}
                    icon={<ArrowDownTrayIcon className={classes.menuButtonIcon}/>}
                    onClick={() => console.log('imports list`')}
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
    </>);

};
