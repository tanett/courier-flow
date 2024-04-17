import React, { useEffect, useState } from 'react';
import { useForm } from '@mantine/form';
import { initialForm, typeAddRetailProductToStoreForm } from './form';
import { Box, Button, Flex, Input, rem, Space, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { typeResponseError } from 'app/api/types';
import { errorHandler } from 'app/utils/errorHandler';
import { notificationActions } from '../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { useCreateRetailProductMutation } from '../../entities/retail-products/api/api';
import { typeReturnForm } from 'features/selector-with-search-store/types';
import { IMaskInput } from 'react-imask';
import { typeCreateRetailProduct } from '../../entities/retail-products/model/types';


export const RetailProductAddToStore: React.FC<{ productId: string, onClose: (refetch: boolean) => void }> = ({
    productId,
    onClose,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const merchantId = useSelectorT(state => state.userProfile.userProfile?.actor.merchantId)

    const form = useForm<typeAddRetailProductToStoreForm>(initialForm);

    const dispatchAppT = useAppDispatchT();

    const [ createRetailProduct, { isLoading } ] = useCreateRetailProductMutation();

    const onCancelClick = () => {

        form.reset();
        onClose(false);

    };

    const [ isInProgress, setIsInProgress ] = useState(false);

    const onSubmit = async () => {

        if (form.values.storeId && form.values.price && merchantId) {

            setIsInProgress(true);
            const dataObject: typeCreateRetailProduct = {
                storeId: form.values.storeId,
                price: parseFloat(form.values.price),  // from masked input we get the value as string with,
                productId: productId,
                merchantId: merchantId
            };

            try {

                await createRetailProduct(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Store with price was added successfully.`),
                }));

                onClose(true);

            } catch (err) {

                errorHandler(err as typeResponseError, 'onCreateRetailProduct', dispatchAppT);


            }
            setIsInProgress(false);

        }


    };

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Box
                sx={ {
                    minWidth: '50vw',
                    paddingBottom: rem(15),
                    paddingLeft: rem(16),
                    paddingRight: rem(16),
                  //  marginTop: rem(-10),
                    position: 'relative',
                    overflow: 'visible',
                    '& .mantine-InputWrapper-root': { maxWidth: 'none' }
                } }>
                <SelectorWithSearchStore
                    required={ true }
                    fieldName={ 'storeId' }
                    form={ form as unknown as typeReturnForm }
                    initialValue={ null }
                />
                <Input.Wrapper
                    id={ 'price-input-wrapper' }
                    label={ <Trans>Price</Trans> }
                    required
                    mt={ 16 }>
                    <Input<any>
                        component={ IMaskInput }
                        mask={ Number }
                        scale={ 2 } // digits after point, 0 for integers
                        padFractionalZeros={ false } // if true, then pads zeros at end to the length of scale
                        normalizeZeros={ true } // appends or removes zeros at ends
                        // thousandsSeparator = { ' ' }  // any single char  // thousand separator work badly !
                        radix={ '.' } // fractional delimiter
                        mapToRadix={ [ ',' ] } // symbols to process as radix
                        placeholder={ '' }
                        // additional number interval options (e.g.)
                        min={ 0 }
                        max={ 100000000000 }
                        autofix={ true }
                        overwrite = {true}
                        id={ 'price-input' }
                        { ...form.getInputProps('price') }

                    />
                </Input.Wrapper>
                <Space h={ 32 }/>
                <Flex sx={ {
                    gap: rem(24),
                    justifyContent: 'center',
                    '& .mantine-Button-root': {
                        minWidth: rem(165),
                        fontSize: theme.fontSizes.md,
                        fontWeight: 700,
                    },
                } }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancelClick }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                            type="submit">{ t`Save` }</Button>
                </Flex>
            </Box>
           {isLoading && <LoaderOverlay/>}
        </form>
    );

};
