import React, { useState } from 'react';
import { TYPE_INPUT, typeDiscountInput } from './types';
import { Flex, Input, SimpleGrid } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { useStyles } from './styles';
import { Trans } from '@lingui/macro';
import cn from 'classnames';

const DiscountInput: React.FC<typeDiscountInput> = ({ form, disabled }) => {

    const { classes } = useStyles();

    const [ typeInput, setTypeInput ] = useState<TYPE_INPUT>(form.values.isDiscountInPercent ?TYPE_INPUT.PERCENT: TYPE_INPUT.MONEY);

    // useEffect(() => {
    //     if(+form.values.discount > 100 && typeInput === TYPE_INPUT.MONEY && form.errors.discount==='The discount cannot be greater than 100%.') {
    //         form.clearFieldError('discount')
    //     }
    //
    // }, [typeInput]);

    return (
        <Flex>
            <Input.Wrapper

                id={ 'discount-input-wrapper' }
                label={ <Trans>Discount</Trans> }
                className={ classes.inputWrapper }
                error={ form.getInputProps('isDiscountInPercent').error }
              >
                <Input<any> // a thousand separator work badly
                    disabled={disabled}
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

                    id={ 'discount-input-change' }
                    { ...form.getInputProps('discount') }
                    rightSectionWidth={ 96 }
                    rightSection={ <SimpleGrid cols={ 2 } className={ classes.inputButtons }>
                        <button type={ 'button' }
                                className={ cn(classes.inputTypeButton, typeInput === TYPE_INPUT.PERCENT && classes.inputTypeButtonSelected) }
                                onClick={ (event) => {
                                    event.preventDefault();
                                    setTypeInput(TYPE_INPUT.PERCENT);
                                    form.setFieldValue('isDiscountInPercent', true)
                                } }><Trans>%</Trans></button>
                        <button type={ 'button' }
                                className={ cn(classes.inputTypeButton, typeInput === TYPE_INPUT.MONEY && classes.inputTypeButtonSelected) }
                                onClick={ (event) => {
                                    event.preventDefault();
                                    setTypeInput(TYPE_INPUT.MONEY);
                                    form.setFieldValue('isDiscountInPercent', false)
                                } }><Trans>sum</Trans></button>

                    </SimpleGrid> }

                />

            </Input.Wrapper>

        </Flex>
    );
};

export default DiscountInput;
