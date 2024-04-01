import React from 'react';
import { PRODUCT_ADDITIONAL_FIELD, typeProductAdditionalFieldInfo } from '../model/state-slice';
import { TextInput } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { typeProductForm } from 'features/product-create/types/types';
import { useSelectorT } from 'app/state';

export const CreateInputForAdditionalField: React.FC<{
    additionalFields: typeProductAdditionalFieldInfo[]
    code: PRODUCT_ADDITIONAL_FIELD,
    form: UseFormReturnType<typeProductForm>,
    path: string
}> = ({
    additionalFields,
    code,
    form,
    path
}) => {

    const field = additionalFields.find((field: typeProductAdditionalFieldInfo) => field.code === code);

    return (
        field ?
            <TextInput
                withAsterisk={ field.required }
                label={ field.name }
                placeholder={ field.patternDescription ?? '' }
                { ...form.getInputProps(path) }
                maxLength={ 50 }
            />
            : null
    );
};
