import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { initialForm, typeEditRetailProductToStoreForm, } from './form';
import { Box, Button, Flex, Input, rem, Space, TextInput, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAppDispatchT } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { usePatchRetailProductMutation } from '../../entities/retail-products/api/api';
import { IMaskInput } from 'react-imask';
import { typeEditRetailProduct, typeRetailProduct } from '../../entities/retail-products/model/types';
import { notificationActions } from '../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';


export const RetailProductEditPrice: React.FC<{ data: typeRetailProduct, onClose: (refetch: boolean) => void }> = ({
    data,
    onClose,
}) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();

    const form = useForm<typeEditRetailProductToStoreForm>({
        ...initialForm,
        initialValues: { price: data.price.toString() }
    });

    const dispatchAppT = useAppDispatchT();

    const [ editRetailProduct, { isLoading } ] = usePatchRetailProductMutation();

    const onCancelClick = () => {

        form.reset();
        onClose(false);

    };

    const [ isInProgress, setIsInProgress ] = useState(false);

    const onSubmit = async () => {

        if (form.values.price) {

            setIsInProgress(true);
            const dataObject: typeEditRetailProduct = {
                id: data.id,
                price: parseFloat(form.values.price)  // from masked input we get the value as string with ,
            };
            try {

                await editRetailProduct(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Price was changed successfully.`),
                }));

                onClose(true);

            } catch (err) {

                errorHandler(err as typeResponseError, 'onEditRetailProduct', dispatchAppT);


            }
            setIsInProgress(false);

        }


    };

    return (
        <form onSubmit={ form.onSubmit(onSubmit) }>
            <Box
                sx={ {
                    minWidth: '50vw',
                    padding: rem(15),
                    marginTop: rem(-10),
                    position: 'relative',
                    overflow: 'visible',
                    '& .mantine-InputWrapper-root': { maxWidth: 'none' }
                } }>
                <TextInput
                    label={ <Trans>Store</Trans> }
                    value={ data.store.name || '' }
                    disabled
                />
                <Input.Wrapper
                    id={ 'change-price-input-wrapper' }
                    label={ <Trans>Price</Trans> }
                    error={ form.getInputProps('price').error }
                    required
                    mt={ 16 }>
                    <Input<any> // thousand separator work badly
                        component={ IMaskInput }
                        mask={ Number }
                        scale={ 2 } // digits after point, 0 for integers
                        padFractionalZeros={ false } // if true, then pads zeros at end to the length of scale
                        normalizeZeros={ true } // appends or removes zeros at ends
                        radix={ '.' } // fractional delimiter
                        mapToRadix={ [ ',' ] } // symbols to process as radix
                        placeholder={ '' }
                        // additional number interval stores (e.g.)
                        min={ 0 }
                        max={ 100000000000 }
                        autofix={ true }

                        id={ 'price-input-change' }
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
                            type="submit">{ t`Change` }</Button>
                </Flex>
            </Box>
            { isLoading && <LoaderOverlay/> }
        </form>
    );

};
