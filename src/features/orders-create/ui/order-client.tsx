import React from 'react';
import { useStyles } from './styles';
import {  typeReturnOrderForm } from '../types/types';
import { Flex, SimpleGrid, TextInput, Textarea } from '@mantine/core';
import { Trans } from '@lingui/macro';
import { FieldsetForForm } from 'shared/ui/fieldset-for-form';

import { PhoneInputWithCountrySelector } from 'shared/ui/phone-input';



export const OrderClient: React.FC<{ form:  typeReturnOrderForm }> = ({ form, }) => {


    const { classes } = useStyles();

    return (
      <fieldset className={classes.fieldset} >

            <Flex className={ classes.flexColumn }>

                <FieldsetForForm title={ <Trans>Contacts</Trans> }>

                    <SimpleGrid cols={ 2 } className={ classes.formGrid }>
                        <PhoneInputWithCountrySelector
                            isRequired={true}
                            {...form.getInputProps('customer.phone')}
                            value={ form.values.customer.phone }
                            onChange={(value: string) => form.setFieldValue('customer.phone', value)}

                        />
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
