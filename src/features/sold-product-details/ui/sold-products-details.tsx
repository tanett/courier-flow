import React from 'react';
import { Box, SimpleGrid, useMantineTheme, Text, Flex } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { useGetData } from '../hooks/use-get-data';
import { NotFound } from 'shared/ui/not-found/not-found';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';


export const SoldProductsDetails: React.FC<{ id: string, productName: string }> = ({
    id,
    productName
}) => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const {
        product,
        isNotFound,
        isLoading
    } = useGetData(id, productName);

    const navigate = useNavigate()

    return (isNotFound
            ?   <Flex sx={{height: '80vh', alignItems: 'center'}}><NotFound/></Flex>
            : <>
            <Box sx={ {
                border: `1px solid ${ theme.colors.borderColor[0] }`,
                borderTopRightRadius: '8px',
                borderBottomRightRadius: '8px',
                borderBottomLeftRadius: '8px',
                padding: '10px 16px',
                marginTop: '-1px',
                backgroundColor: theme.white,
            } }>

                <InfoCardSmall label={ i18n._(t`Product`) }
                               content={ product
                                   ? product.id
                                       ? <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.products_details, {id: id, name: productName}))} label={ i18n._(t`See product card`) }/>
                                       : 'The product does not exist in the product catalog'
                                   : '-' }/>
                <SimpleGrid

                    breakpoints={ [
                        {
                            minWidth: 'md',
                            cols: 2,
                            spacing: 10,
                        },
                        {
                            minWidth: 1200,
                            cols: 4,
                            spacing: 60,
                        }
                    ] }>
                    <InfoCardSmall label={ i18n._(t`Quantity`) }
                                   alignSelfStretch={ true }
                                   content={ product ?  <Flex gap={10}>{ product.quantity } <span>{product?.unit?.toLowerCase()}</span></Flex> : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Price for unit`) }
                                   alignSelfStretch={ true }
                                   content={ product?.unitPrice ? numberCurrencyFormat(product.unitPrice) : '-' }/>
                    <InfoCardSmall label={ i18n._(t`Total price`) }
                                   alignSelfStretch={ true }
                                   content={ (product?.quantity && product?.unitPrice) ? numberCurrencyFormat(product.quantity *  product.unitPrice) : '-' }/>
                    <div/>
                    <InfoCardSmall label={ <Trans>Discount <Text fw={500}>&nbsp; %/sum</Text></Trans> }
                    alignSelfStretch={ true }
                    content={ product ? <Text>{product?.discountPercent && numberCurrencyFormat(product.discountPercent)}% / {product?.discountAmount && numberCurrencyFormat(product.discountAmount)}</Text>  : '-' }/>
                    <InfoCardSmall label={ <Trans>VAT <Text fw={500}>&nbsp; %/sum</Text></Trans> }
                                   alignSelfStretch={ true }
                                   content={ product? <Text>{product?.vatPercent && numberCurrencyFormat(product.vatPercent)}% / {product?.vatAmount && numberCurrencyFormat(product.vatAmount)}</Text>: '-' }/>
                    <InfoCardSmall label={ i18n._(t`Total cost`) }
                                   alignSelfStretch={ true }
                                   content={ product?.totalCost ? numberCurrencyFormat(product.totalCost) : '-' }/>
                    <div/>

                </SimpleGrid>
                <InfoCardSmall label={ i18n._(t`Marked labels`) }
                               alignSelfStretch={ true }
                               withBottomBorder={false}
                               content={ product?.markedLabels ?  product.markedLabels.join(' , ') : '-' }/>

            </Box>

            { isLoading && <LoaderOverlay/> }
        </>
    );

};
