import React, { useEffect, useState } from 'react';
import { useStyles } from './styles';
import { useForm } from '@mantine/form';
import { typeCashDeskEditForm } from '../types/types';
import { initialCashDeskEditForm, mapRequestFieldsToFormFieldCashDesk } from '../form/form';
import { useAppDispatchT, useSelectorT } from 'app/state';
import { Button, Flex, Input, SimpleGrid, Space, TextInput } from '@mantine/core';
import { t } from '@lingui/macro';
import { useLingui } from '@lingui/react';
import { LoaderOverlay } from 'shared/ui/loader-overlay';
import { notificationActions } from '../../../entities/notification/model';
import { NOTIFICATION_TYPES } from 'shared/ui/page-notification';
import { typeResponseError } from 'app/api/types';
import { useNavigate } from 'react-router-dom';
import { errorHandlerForForm, typeReturnForm } from 'app/utils/error-handler-for-form';
import { useGetCashDeskByIdQuery, usePatchCashDeskMutation } from '../../../entities/cash-desk/api/api';
import { typeCashDeskEdit } from '../../../entities/cash-desk/model/types';
import { SelectorWithSearchStore } from 'features/selector-with-search-store';
import { IMaskInput } from 'react-imask';
import { defaultCurrency } from 'app/config/currency';


export const CashDeskEdit: React.FC<{cashDeskId: string}> = ({cashDeskId}) => {

    const { classes } = useStyles();

    const navigate = useNavigate();

    const { i18n } = useLingui();

    const dispatchAppT = useAppDispatchT();

    const {
        data,
        isFetching,
    } = useGetCashDeskByIdQuery(cashDeskId);

    const form = useForm<typeCashDeskEditForm>(initialCashDeskEditForm);

    useEffect(() => {

        if (data){

            form.setFieldValue('name', data.name);
            form.setFieldValue('storeId', data.storeId);
            form.setFieldValue('amount', data.cashDeskBalances.find(item=>item.currency === defaultCurrency)?.amount.toString() || '-');

        }

    }, [ data ]);

    const [ editCashDesk, { isLoading } ] = usePatchCashDeskMutation();

    const [ isInProgress, setIsInProgress ] = useState(false);

    const currentUser = useSelectorT(state => state.userProfile.userProfile);


    const onSave = async () => {

        if (currentUser && form.values.storeId) {

            setIsInProgress(true);


            const dataObject: typeCashDeskEdit = {
                id: cashDeskId,
                name: form.values.name.trim(),
            };

            try {

                await editCashDesk(dataObject).unwrap();

                dispatchAppT(notificationActions.addNotification({
                    type: NOTIFICATION_TYPES.SUCCESS,
                    message: i18n._(t`Cash desk edited successfully.`),
                }));

                navigate(-1);

            } catch (err) {
                errorHandlerForForm(err as typeResponseError, 'onPatchCashDesk', dispatchAppT, form as unknown as typeReturnForm, mapRequestFieldsToFormFieldCashDesk);

                setIsInProgress(false);

            }


            setIsInProgress(false);

        }

    };

    const onCancel = () => {

        form.reset();
        navigate(-1);

    };

    return (
        <form onSubmit={ form.onSubmit(onSave) }>

            <Flex className={ classes.flexColumn }>


                <TextInput
                    withAsterisk
                    label={ mapRequestFieldsToFormFieldCashDesk.name.translatedValue }
                    { ...form.getInputProps('name') }
                    maxLength={ 150 }
                    sx={ {
                        '&.mantine-InputWrapper-root': {
                            maxWidth: '100%',
                            width: '100%',
                        },
                    } }
                />

                <SelectorWithSearchStore
                    required={ true }
                    fieldName={ 'storeId' }
                    form={ form as unknown as typeReturnForm }
                    initialValue={ null }
                    disabled={true}
                />
                <SimpleGrid cols={2}>
                    <Input.Wrapper
                        id={ 'amount-input-wrapper' }
                        label={ mapRequestFieldsToFormFieldCashDesk.amount.translatedValue }
                        error={ form.getInputProps('amount').error }
                        required
                        mt={ 16 }>
                        <Input<any>
                            disabled={true}
                            component={ IMaskInput }
                            mask={ Number }
                            scale={ 2 } // digits after point, 0 for integers
                            padFractionalZeros={ false } // if true, then pads zeros at end to the length of scale
                            normalizeZeros={ true } // appends or removes zeros at ends
                            radix={ '.' } // fractional delimiter
                            mapToRadix={ [ ',' ] } // symbols to process as radix

                            // additional number interval stores (e.g.)
                            min={ 0 }
                            max={ 1000000000 }
                            autofix={ true }
                            id={ 'amount-cash-desk-input' }

                            { ...form.getInputProps('amount') }

                        />
                    </Input.Wrapper>
                </SimpleGrid>


                <Space h={ 10 }/>
                <Flex className={ classes.buttonsBar }>
                    <Button key="cancel" type="reset" variant="outline" onClick={ onCancel }>{ t`Cancel` }</Button>
                    <Button key="submit" disabled={ !!Object.values(form.errors).length || isInProgress }
                            type="submit">{ t`Save` }</Button>
                </Flex>

            </Flex>
            { (isInProgress || isLoading || isFetching) && <LoaderOverlay/> }
        </form>
    );

};
