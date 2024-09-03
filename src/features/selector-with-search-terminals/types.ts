import { type UseFormReturnType } from '@mantine/form';
import { type UseFormInput } from '@mantine/form/lib/types';

type formType = UseFormInput<Record<string, unknown>>

export type typeReturnForm = UseFormReturnType<formType, (values:formType)=>formType>


export type typeSelectorTerminals = {
    required: boolean,
    fieldName: string,
    form: typeReturnForm,
    initialValue: string | null,
    disabled?: boolean,
    label?: string
}
