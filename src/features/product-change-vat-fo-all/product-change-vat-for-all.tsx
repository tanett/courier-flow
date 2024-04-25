import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import { initialForm, typeChangeVatForAllForm } from './form';
import { Box, Button, Flex, Input, rem, Space, useMantineTheme } from '@mantine/core';
import { t, Trans } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { IMaskInput } from 'react-imask';
import { notificationActions } from '../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { errorHandler } from 'app/utils/errorHandler';
import { typeResponseError } from 'app/api/types';
import { useChangeVatForALlMutation } from '../../entities/products/api/api';
import { typeChangeVatForAll } from '../../entities/products/model/state-slice';


export const ProductChangeVatForAll: React.FC<{ onClose: () => void, }> = ({ onClose }) => {

    const { i18n } = useLingui();

    const theme = useMantineTheme();
    const merchantId = useSelectorT(state => state.userProfile.userProfile?.actor.merchantId);
    const form = useForm<typeChangeVatForAllForm>(initialForm);

    const dispatchAppT = useAppDispatchT();

    const [ changeVat, { isLoading } ] = useChangeVatForALlMutation();

    const onCancelClick = () => {

        form.reset();
        onClose();

    };

    const [ isInProgress, setIsInProgress ] = useState(false);

    const onSubmit = async () => {

        if (merchantId) {

            setIsInProgress(true);

            const dataObject: typeChangeVatForAll = {
                merchantId: merchantId,
                newVat: +((parseFloat(form.values.newVat) / 100).toFixed(4)), // from masked input we get the value as string with ,
            };

            try {

                await changeVat(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Vats were changed successfully.`),
                }));

                onClose();

            } catch (err) {

                errorHandler(err as typeResponseError, 'onChangeAllVat', dispatchAppT);


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
                    '& .mantine-InputWrapper-root': { maxWidth: 'none' },
                } }>

                <Input.Wrapper
                    id={ 'vat-input-wrapper' }
                    label={ <Trans>Vat</Trans> }
                    error={ form.getInputProps('newVat').error }
                    required
                    mt={ 16 }>
                    <Input<any>
                        component={ IMaskInput }
                        mask={ Number }
                        scale={ 2 } // digits after point, 0 for integers
                        padFractionalZeros={ false } // if true, then pads zeros at end to the length of scale
                        normalizeZeros={ true } // appends or removes zeros at ends
                        radix={ '.' } // fractional delimiter
                        mapToRadix={ [ ',' ] } // symbols to process as radix
                        placeholder={ '0.00-100%' }

                        // additional number interval stores (e.g.)
                        min={ 0 }
                        max={ 100 }
                        autofix={ true }
                        id={ 'vat-all-input' }

                        // lazy={false}
                        // unmask={true}
                        // overwrite={true}
                        { ...form.getInputProps('newVat') }

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
