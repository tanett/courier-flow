import React from 'react';
import { PRODUCT_ADDITIONAL_FIELD, typeProductAdditionalFieldInfo } from '../model/state-slice';
import { Input } from '@mantine/core';
import { type UseFormReturnType } from '@mantine/form';
import { typeProductForm } from 'features/product-create/types/types';
import { IMaskInput } from 'react-imask';

export const CreateInputForAdditionalField: React.FC<{
    additionalFields: typeProductAdditionalFieldInfo[]
    code: PRODUCT_ADDITIONAL_FIELD,
    form: UseFormReturnType<typeProductForm>,
    path: string
}> = ({
    additionalFields,
    code,
    form,
    path,
}) => {

    const field = additionalFields.find((field: typeProductAdditionalFieldInfo) => field.code === code);

    const regexp = field?.pattern.replace(/({)(\d*)(})/g, '$1 0,$2 $3').replaceAll(' ', '');

    return (
        field ?
            <>
                {/* <TextInput */ }
                {/*     withAsterisk={ field.required } */ }
                {/*     label={ field.name } */ }
                {/*     placeholder={ field.patternDescription ?? '' } */ }
                {/*     { ...form.getInputProps(path) } */ }
                {/*     maxLength={ 50 } */ }
                {/* /> */ }
                <Input.Wrapper
                    id={ path }
                    label={ field.name }
                    required={ field.required }
                    error={ form.getInputProps(path).error }
                >
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
