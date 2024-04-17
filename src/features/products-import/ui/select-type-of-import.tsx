import React from 'react';
import { Box, Flex, useMantineTheme } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAppDispatchT } from 'app/state';
import { ButtonPanelMenu } from 'shared/ui/button-panel-menu';
import { BuildingStorefrontIcon, DocumentTextIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import { CardImport } from 'features/products-import/ui/card-import';
import { SelectFile } from 'features/products-import/ui/select-file';
import { SelectStores } from 'features/products-import/ui/select-stores/select-stores';
import { typeSelectTypeOfImport } from 'features/products-import/types/types';


export const SelectTypeOfImport: React.FC<typeSelectTypeOfImport> = ({setStep, setImportOptions}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    return (
        <Flex direction="column" pb={ 8 } px={ 15 } mt={'-15px'}>
            <Box sx={ {
                alignSelf: 'end',
                marginBottom: '8px'
            } }>
                <ButtonPanelMenu
                    trigger={'hover'}
                    sxForMainButton={ {
                    border: 'none',
                    width: '36px',
                    height: '36px',
                    '&:hover, &:active, &:focus, &[aria-expanded="true"]': { backgroundColor: theme.colors.primary[0], border:`1px solid ${theme.colors.gray[5]}`, borderRadius: '4px' }
                } }>
                    <ButtonPanelMenu.MenuItem
                        label={ i18n._(t`Import file template for stores specified in the Excel file`) }
                        onClick={ () => console.log('1') }
                    />
                    <ButtonPanelMenu.MenuItem
                        label={ i18n._(t`Import file template for selected stores`) }
                        onClick={ () => console.log('2`') }
                    />
                    <ButtonPanelMenu.MenuItem
                        label={ i18n._(t`Template file for import into catalog`) }
                        onClick={ () => console.log('3') }
                    />
                </ButtonPanelMenu>
            </Box>
            <Flex direction={ 'row' } wrap={'wrap'} gap={ 16 } justify={ 'center' }>
                <CardImport icon={ <DocumentTextIcon/> }
                            label={ i18n._(t`To the stores indicated in the Excel file`) }
                            description={ i18n._(t`Stores and prices for each product are indicated in the import file`) }
                            onClick={ () => setStep(2) }
                />
                <CardImport icon={ <BuildingStorefrontIcon/> }
                            label={ i18n._(t`To selected stores`) }
                            description={ i18n._(t`Uploading products to selected stores with a price from the import file`) }
                            onClick={ () => setStep(1) }
                />
                <CardImport icon={ <Squares2X2Icon/> }
                            label={ i18n._(t`To catalog`) }
                            description={ i18n._(t`Uploading products to the catalog without indicating prices or attaching them to stores`) }
                            onClick={ () => setStep(2) }
                />
            </Flex>
        </Flex>
    );

};
