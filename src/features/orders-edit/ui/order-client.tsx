import React, { useEffect, useState } from 'react';
import { useStyles } from 'features/orders-create/ui/styles';
import { Flex, SimpleGrid, TextInput, Textarea, Popover, Box, Text, rem } from '@mantine/core';
import { Trans } from '@lingui/macro';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';

import { PhoneInputWithCountrySelector } from 'shared/ui/phone-input';
import { useDebouncedValue } from '@mantine/hooks';
import { typeOrdersCustomer } from '../../../entities/orders-customer/model/types';
import { typeReturnOrderForm } from 'features/orders-create/types/types';
import { useGetCustomers } from 'features/orders-create/hooks/use-get-customers';



export const OrderClient: React.FC<{ form:  typeReturnOrderForm }> = ({ form, }) => {


    const { classes } = useStyles();

    const [customerTipsOpened, setCustomerTipsOpened] = useState(true);

    const [ debounced ] = useDebouncedValue(form.values.customer.phone, 800);

const {customers, isFetchingCustomers}=useGetCustomers(debounced)

    useEffect(() => {
        if(customers && customers.length>0){
            setCustomerTipsOpened(true);
        }
    }, [customers]);

const onCustomerClickHandler = (customer: typeOrdersCustomer)=>{
    form.setFieldValue('customer', { phone: customer.phone, email: customer.email, fullName: customer.fullName})
    form.setFieldValue('deliveryAddress', {
        address: customer.addresses[0].address,
        additionalInfo: customer.addresses[0].additionalInfo,
    })
    setCustomerTipsOpened(false);
}

    return (
      <fieldset className={classes.fieldset} >

            <Flex className={ classes.flexColumn }>

                <FieldsetForForm title={ <Trans>Contacts</Trans> }>

                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <Popover
                            opened={customerTipsOpened}
                                 position="top"
                            offset={ { mainAxis: -20 }}
                                 width="target"
                                 transitionProps={{ transition: 'pop' }}>
                            <Popover.Target>
                                <div
                                    // onFocusCapture={() => setPopoverOpened(true)}
                                    // onBlurCapture={() => setPopoverOpened(false)}
                                >
                        <PhoneInputWithCountrySelector
                            isRequired={true}
                            {...form.getInputProps('customer.phone')}
                            value={ form.values.customer.phone }
                            onChange={(value: string) => form.setFieldValue('customer.phone', value)}

                        />
                                </div>
                                </Popover.Target>
                            <Popover.Dropdown   className={classes.popoverCustomerTips} >
                               <Box p={0}>
                                   {customers && customers.map( (customer, index) => (  <Box
                                       key={index}
                                       sx={theme=>({
                                       letterSpacing: 0.3,
                                       padding: '5px 8px',
                                       backgroundColor: 'white',
                                       cursor: 'pointer',
                                       '&:hover':{backgroundColor:theme.colors.gray[ 0 ],},
                                   })}
                                                                       onClick={()=>onCustomerClickHandler(customer)}>
                                       <Text size={'md'} >{customer.phone}</Text>
                                       <Text  size={'sm'} c={'gray.5'} lh={'14px'} >{customer.fullName}</Text>
                                   </Box>))}

                               </Box>
                            </Popover.Dropdown>
                        </Popover>
                        <TextInput
                            label={ <Trans>E-mail</Trans> }
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
                        label={ <Trans>Delivery address</Trans> }
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
                            label={ <Trans>Client name</Trans> }
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
                        label={ <Trans>Comment</Trans> }
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
