import React from 'react';
import { Box, SimpleGrid, useMantineTheme, Text, Flex } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { InfoCardSmall } from 'shared/ui/info-card-small';
import ButtonAsLink from 'shared/ui/button-as-link/button-as-link';
import { numberCurrencyFormat } from 'shared/utils/convertToLocalCurrency';
import { generatePath, useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';
import { useSelectorT } from 'app/state';


export const AdvancesSoldProductsDetails: React.FC= () => {

    const theme = useMantineTheme();

    const { i18n } = useLingui();

    const navigate = useNavigate()

    const soldProduct = useSelectorT(state => state.soldProductDetails.soldProduct);

    return <Box sx={ {
        border: `1px solid ${ theme.colors.borderColor[0] }`,
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px',
        borderBottomLeftRadius: '8px',
        padding: '10px 16px',
        marginTop: '-1px',
        backgroundColor: theme.white,
    } }>

        <InfoCardSmall label={ i18n._(t`Product`) }
                       content={ soldProduct
                           ? soldProduct.id
                               ? <ButtonAsLink onClick={ () => navigate(generatePath(routerPaths.products_details, {id: soldProduct.id, name: soldProduct.name})) }
                                               label={ i18n._(t`See product card`) }/>
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
                           content={ soldProduct ? <Flex gap={ 10 }>{ soldProduct.quantity } <span>{ soldProduct?.unit?.toLowerCase() }</span></Flex> : '-' }/>
            <InfoCardSmall label={ i18n._(t`Price for unit`) }
                           alignSelfStretch={ true }
                           content={ soldProduct?.priceInStore ? numberCurrencyFormat(soldProduct.priceInStore) : '-' }/>
            <InfoCardSmall label={ i18n._(t`Total price`) }
                           alignSelfStretch={ true }
                           content={ (soldProduct?.quantity && soldProduct?.priceInStore) ? numberCurrencyFormat(soldProduct.quantity * soldProduct.priceInStore) : '-' }/>
            <div/>
            <InfoCardSmall label={ <Trans>Discount <Text fw={ 500 }>&nbsp; %/sum</Text></Trans> }
                           alignSelfStretch={ true }
                           content={ soldProduct ? <Text>{ "soldProduct?.discountPercent && numberCurrencyFormat(soldProduct.discountPercent)" }% / { soldProduct?.discountAmount && numberCurrencyFormat(soldProduct.discountAmount) }</Text> : '-' }/>
            <InfoCardSmall label={ <Trans>VAT <Text fw={ 500 }>&nbsp; %/sum</Text></Trans> }
                           alignSelfStretch={ true }
                           content={ soldProduct ? <Text>{ soldProduct?.vatPercent && numberCurrencyFormat(soldProduct.vatPercent) }% / { soldProduct?.vatAmount && numberCurrencyFormat(soldProduct.vatAmount) }</Text> : '-' }/>
            <InfoCardSmall label={ i18n._(t`Total cost`) }
                           alignSelfStretch={ true }
                           content={ soldProduct?.totalCost ? numberCurrencyFormat(soldProduct.totalCost) : '-' }/>
            <div/>

        </SimpleGrid>
        <InfoCardSmall label={ i18n._(t`Marked labels`) }
                       alignSelfStretch={ true }
                       withBottomBorder={ false }
                       content={ soldProduct?.markedLabels ? soldProduct.markedLabels.join(' , ') : '-' }/>

    </Box>;

};
