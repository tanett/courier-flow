import React from 'react';
import { PRODUCT_ADDITIONAL_FIELD, typeProductAdditionalFieldInfo } from '../model/state-slice';
import { Flex, Input } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { typeProductForm } from 'features/product-create/types/types';
import { IMaskInput } from 'react-imask';


export const CreateInputForAdditionalField: React.FC<{
    additionalFields: typeProductAdditionalFieldInfo[]
    code: PRODUCT_ADDITIONAL_FIELD,
    form: UseFormReturnType<typeProductForm>,
    path: string,
    additionalLabel?: React.ReactNode
}> = ({
    additionalFields,
    code,
    form,
    path,
    additionalLabel
}) => {

    const field = additionalFields.find((field: typeProductAdditionalFieldInfo) => field.code === code);

    const regexp = field?.pattern.replace(/({)(\d*)(})/g, '$1 0,$2 $3').replaceAll(' ', '');

    return (
        field ?
            <>
                <Input.Wrapper
                    id={ path }
                    required={ field.required }
                    error={ form.getInputProps(path).error }
                >
                    <Flex direction={ 'row' } gap={ 5 } align={ 'baseline' }>
                        <Input.Label required={ field.required }>{ field.name }</Input.Label>
                        { additionalLabel &&  additionalLabel  }
                    </Flex>
                    <Input<any>
                        component={ IMaskInput }
                        placeholder={ field.patternDescription ?? '' }
                        mask={ regexp && RegExp(regexp) }
                        id={ 'input' + path }

                        // lazy={false}
                        // unmask={true}
                        { ...form.getInputProps(path) }
                    />
                </Input.Wrapper>
            </>

            : null
    );

};
