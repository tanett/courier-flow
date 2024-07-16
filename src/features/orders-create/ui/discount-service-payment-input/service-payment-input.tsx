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

    useEffect(() => {
        if(typeInput === TYPE_INPUT.MONEY){form.setFieldValue('servicePaymentPercent', '0')}
        if(typeInput === TYPE_INPUT.PERCENT){form.setFieldValue('servicePaymentAmount', '0')}
    }, [typeInput]);

    return (
        <Flex>
            <Input.Wrapper
                id={ 'service-payment-input-wrapper' }
                label={ <Trans>Service payment</Trans> }
                className={ classes.inputWrapper }
                error={ form.getInputProps(typeInput === TYPE_INPUT.MONEY ?`servicePaymentAmount` : 'servicePaymentPercent').error }
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
                    max={typeInput === TYPE_INPUT.MONEY ? 100000000 : 100 }
                    autofix={ true }

                    id={ 'service-payment-input-change' }
                    { ...form.getInputProps(typeInput === TYPE_INPUT.MONEY ?`servicePaymentAmount` : 'servicePaymentPercent') }
                    rightSectionWidth={ 96 }
                    rightSection={ <SimpleGrid cols={ 2 } className={ classes.inputButtons }>
                        <button type={ 'button' }
                                className={ cn(classes.inputTypeButton, typeInput === TYPE_INPUT.PERCENT && classes.inputTypeButtonSelected) }
                                onClick={ (event) => {
                                    event.preventDefault();
                                    setTypeInput(TYPE_INPUT.PERCENT);
                                } }><Trans>%</Trans></button>
                        <button type={ 'button' }
                                className={ cn(classes.inputTypeButton, typeInput === TYPE_INPUT.MONEY && classes.inputTypeButtonSelected) }
                                onClick={ (event) => {
                                    event.preventDefault();
                                    setTypeInput(TYPE_INPUT.MONEY);
                                } }><Trans>sum</Trans></button>

                    </SimpleGrid> }

                />

            </Input.Wrapper>

        </Flex>
    );
};

export default ServicePaymentInput;
