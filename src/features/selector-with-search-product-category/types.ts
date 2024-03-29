import type { UseFormInput } from '@mantine/form/lib/types';
import type { UseFormReturnType } from '@mantine/form';

type formType = UseFormInput<Record<string, unknown>>

export type typeReturnForm = UseFormReturnType<formType, (values:formType)=>formType>

export type typeSelectorProductCategory = {
    required: boolean,
    fieldName: string,
    form: typeReturnForm,
    initialValue: string | null
}
