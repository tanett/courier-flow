import React from 'react';
import { useStyles } from './styles';
import { typeReturnOrderForm } from '../types/types';
import { Flex, SimpleGrid, TextInput, Textarea, Popover, Box, Text, Loader } from '@mantine/core';
import { Trans } from '@lingui/macro';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';

import { PhoneInputWithCountrySelector } from 'shared/ui/phone-input';
import { useGetCustomers } from '../hooks/use-get-customers';
import { useDebouncedValue, useFocusWithin } from '@mantine/hooks';
import { typeOrdersCustomer } from '../../../entities/orders-customer/model/types';
import { mapRequestFieldsToFormFieldOrders } from 'features/orders-create/form/form';


export const OrderClient: React.FC<{ form: typeReturnOrderForm }> = ({ form, }) => {


    const { classes } = useStyles();

    const [ debounced ] = useDebouncedValue(form.values.customer.phone, 800,);

    const {
        ref,
        focused
    } = useFocusWithin();

    const {
        customers,
        isFetchingCustomers
    } = useGetCustomers(debounced, focused);


    const onCustomerClickHandler = (customer: typeOrdersCustomer) => {
        form.setFieldValue('customer', {
            phone: customer.phone,
            email: customer?.email || '',
            fullName: customer.fullName
        });
        form.setFieldValue('deliveryAddress', {
            address: customer.lastAddress,
            additionalInfo: customer?.lastAddressAdditionalInfo || ''
        });
        form.clearFieldError('customer.email');
        form.clearFieldError('customer.fullName');
        form.clearFieldError('deliveryAddress.address');
        form.clearFieldError('deliveryAddress.additionalInfo');
    };

    return (
        <fieldset className={ classes.fieldset }>

            <Flex className={ classes.flexColumn }>

                <FieldsetForForm title={ <Trans>Contacts</Trans> }>

                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <div ref={ ref }>
                            <Popover
                                opened={ !!customers && customers.length >0 && focused }
                                defaultOpened={ false }
                                position="top"
                                offset={ { mainAxis: -20 } }
                                width="target"
                                transitionProps={ { transition: 'pop' } }>
                                <Popover.Target>
                                    <Box
                                        sx={ {
                                            position: 'relative',
                                            maxWidth: 'fit-content',
                                            minWidth: 'fit-content'
                                        } }
                                    >
                                        <PhoneInputWithCountrySelector
                                            isRequired={ true }
                                            { ...form.getInputProps('customer.phone') }
                                            value={ form.values.customer.phone }
                                            onChange={ (value: string) => form.setFieldValue('customer.phone', value) }

                                        />
                                        <Box sx={ {
                                            position: 'absolute',
                                            right: 10,
                                            bottom: 5
                                        } }>{ isFetchingCustomers && <Loader size={ 16 }/> }</Box>
                                    </Box>
                                </Popover.Target>
                                {focused && customers && customers.length >0 &&  <Popover.Dropdown className={ classes.popoverCustomerTips }>
                                    <Box p={ 0 }>
                                        { customers.map((customer, index) => (<Box
                                            key={ index }
                                            sx={ theme => ({
                                                letterSpacing: 0.3,
                                                padding: '5px 8px',
                                                backgroundColor: 'white',
                                                cursor: 'pointer',
                                                '&:hover': { backgroundColor: theme.colors.gray[0], },
                                            }) }
                                            onClick={ () => onCustomerClickHandler(customer) }>
                                            <Text size={ 'md' }>{ customer.phone }</Text>
                                            <Text size={ 'sm' } c={ 'gray.5' } lh={ '14px' }>{ customer.fullName }</Text>
                                        </Box>)) }

                                    </Box>
                                </Popover.Dropdown> }
                            </Popover>
                        </div>
                        <TextInput
                            label={ mapRequestFieldsToFormFieldOrders.email.translatedValue }
                            { ...form.getInputProps('customer.email') }
                            maxLength={ 150 }
                            sx={ {
                                '&.mantine-InputWrapper-root': {
                                    maxWidth: '100%',
                                    width: '100%',
                                },
                            } }
                        />
                    </SimpleGrid>
                    <TextInput
                        withAsterisk
                        label={mapRequestFieldsToFormFieldOrders.address.translatedValue }
                        sx={ {
                            '&.mantine-InputWrapper-root': {
                                maxWidth: '100%',
                                width: '100%',
                            },
                        } }
                        { ...form.getInputProps('deliveryAddress.address') }
                        maxLength={ 250 }
                    />
                </FieldsetForForm>
                <FieldsetForForm title={ <Trans>Other</Trans> }>

                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <TextInput
                            withAsterisk
                            label={ mapRequestFieldsToFormFieldOrders.fullName.translatedValue }
                            { ...form.getInputProps('customer.fullName') }
                            maxLength={ 150 }
                            sx={ {
                                '&.mantine-InputWrapper-root': {
                                    maxWidth: '100%',
                                    width: '100%',
                                },
                            } }
                        />
                    </SimpleGrid>
                    <Textarea
                        label={ mapRequestFieldsToFormFieldOrders.additionalInfo.translatedValue }
                        { ...form.getInputProps('deliveryAddress.additionalInfo') }
                        maxLength={ 250 }
                        className={ classes.fullWidthGrid }
                        rows={ 4 }
                    />
                </FieldsetForForm>

            </Flex>

        </fieldset>
    );

};
