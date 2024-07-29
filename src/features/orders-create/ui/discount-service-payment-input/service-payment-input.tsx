import React, { useState } from 'react';
import { TYPE_INPUT, typeDiscountInput } from './types';
import { Flex, Input, SimpleGrid } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { useStyles } from './styles';
import { Trans } from '@lingui/macro';
import cn from 'classnames';
import { mapRequestFieldsToFormFieldOrders } from 'features/orders-create/form/form';

const ServicePaymentInput: React.FC<typeDiscountInput> = ({ form }) => {

    const { classes } = useStyles();

    const [ typeInput, setTypeInput ] = useState<TYPE_INPUT>( form.values.isServicePaymentInPercent ?TYPE_INPUT.PERCENT: TYPE_INPUT.MONEY);

    return (
        <Flex>
            <Input.Wrapper
                id={ 'service-payment-input-wrapper' }
                label={ mapRequestFieldsToFormFieldOrders.servicePaymentAmount.translatedValue }
                className={ classes.inputWrapper }
                error={ form.getInputProps( 'isServicePaymentInPercent').error }
              >
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
                    max={ 100000000  }
                    autofix={ true }

                    id={ 'service-payment-input-change' }
                    { ...form.getInputProps('servicePayment') }
                    rightSectionWidth={ 96 }
                    rightSection={ <SimpleGrid cols={ 2 } className={ classes.inputButtons }>
                        <button type={ 'button' }
                                className={ cn(classes.inputTypeButton, typeInput === TYPE_INPUT.PERCENT && classes.inputTypeButtonSelected) }
                                onClick={ (event) => {
                                    event.preventDefault();
                                    setTypeInput(TYPE_INPUT.PERCENT);
                                    form.setFieldValue('isServicePaymentInPercent', true)
                                } }><Trans>%</Trans></button>
                        <button type={ 'button' }
                                className={ cn(classes.inputTypeButton, typeInput === TYPE_INPUT.MONEY && classes.inputTypeButtonSelected) }
                                onClick={ (event) => {
                                    event.preventDefault();
                                    setTypeInput(TYPE_INPUT.MONEY);
                                    form.setFieldValue('isServicePaymentInPercent', false)

                                } }><Trans>sum</Trans></button>

                    </SimpleGrid> }

                />
<Input.Error>{form.errors.servicePayment}</Input.Error>
            </Input.Wrapper>

        </Flex>
    );
};

export default ServicePaymentInput;
