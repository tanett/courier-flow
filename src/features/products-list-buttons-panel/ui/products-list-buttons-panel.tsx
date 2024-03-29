import React, { useState } from 'react';
import { Button, Flex, Menu } from '@mantine/core';
import { useStyles } from './styles';
import { t, Trans } from '@lingui/macro';
import { ArchiveBoxXMarkIcon, ArrowDownTrayIcon, ArrowUpTrayIcon, CurrencyDollarIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';
import { Modal } from '../../../shared/ui/modal';
import { i18n } from '@lingui/core';
import { typeModalContent } from '../types/type';
import { ArchiveProductsDialog } from 'features/products-list-buttons-panel/ui/dialogs/archive-products-dialog';
import { ButtonPanelMenu } from '../../../shared/ui/button-panel-menu';
import { CreateButtonFilled } from 'shared/ui/create-button-filled/create-button-filled';
import { routerPaths } from 'app/config/router-paths';
import { useNavigate } from 'react-router-dom';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import { addProductsPermissions } from 'app/config/permissions-config';
import { IconCurrencyDollar } from '@tabler/icons-react';
import cn from 'classnames';


export const ProductsListButtonsPanel: React.FC = () => {


    const { classes } = useStyles();

    const [ modalContent, setModalContent ] = useState<null | typeModalContent>(null);

    const navigate = useNavigate();

    const isAllowAddProduct = useIsAllowedPermissions(addProductsPermissions);

    const onCloseModal = () => setModalContent(null);

    const onArchive = () => {

        setModalContent({
            title: i18n._(t`Archive products`),
            content: <ArchiveProductsDialog onCancel={onCloseModal}/>,
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
                onClick={() => console.log('Import list')}
            >
                <Trans>Import</Trans>
            </Button>
            <Button
                variant="outline"
                color="gray"
                leftIcon={<ArrowUpTrayIcon className={classes.menuButtonIcon}/>}
                onClick={() => console.log('Export list')}
            >
                <Trans>Export</Trans>
            </Button>
            {isAllowAddProduct && <CreateButtonFilled
                id={ 'create-new-product' }
                handler={ onCreateNewProduct }
            /> }

            <ButtonPanelMenu>
                <ButtonPanelMenu.MenuItem
                    label={i18n._(t`Change prices`)}
                    icon={<CurrencyDollarIcon className={classes.menuButtonIcon}/>}
                    onClick={() => console.log('Change prices`')}
                />
                <ButtonPanelMenu.MenuItem
                    label={i18n._(t`Change vat`)}
                    icon={<ReceiptPercentIcon className={classes.menuButtonIcon}/>}
                    onClick={() => console.log('change vat')}
                />
                <ButtonPanelMenu.MenuItem
                    label={i18n._(t`Archive`)}
                    icon={ <ArchiveBoxXMarkIcon className={cn([classes.menuButtonIcon, classes.colorPrimary5])  } />}
                    onClick={onArchive}
                    primaryColor={true}
                />
            </ButtonPanelMenu>

        </Flex>

        <Modal opened={!!modalContent}>
            <Modal.Header title={modalContent?.title} onClose={onCloseModal}/>
            <Modal.Body>
                {modalContent?.content}
            </Modal.Body>
        </Modal>
    </>);

};
