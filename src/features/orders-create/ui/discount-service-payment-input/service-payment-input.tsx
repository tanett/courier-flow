import React, { useEffect, useState } from 'react';
import { TYPE_INPUT, typeDiscountInput } from './types';
import { Flex, Input, SimpleGrid } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { useStyles } from './styles';
import { Trans } from '@lingui/macro';
import cn from 'classnames';

const ServicePaymentInput: React.FC<typeDiscountInput> = ({ form }) => {

    const { classes } = useStyles();

    const [ typeInput, setTypeInput ] = useState<TYPE_INPUT>(TYPE_INPUT.PERCENT);

    return (
        <Flex>
            <Input.Wrapper
                id={ 'service-payment-input-wrapper' }
                label={ <Trans>Service payment</Trans> }
                className={ classes.inputWrapper }
                error={ form.getInputProps( 'servicePayment').error }
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

            </Input.Wrapper>

        </Flex>
    );
};

export default ServicePaymentInput;
