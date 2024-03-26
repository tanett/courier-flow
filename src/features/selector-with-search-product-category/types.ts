import { type UseFormReturnType } from '@mantine/form';

export type typeSelectorProductCategory<T> = {
    required: boolean,
    fieldName: string,
    form: UseFormReturnType<T, (values: T) => T>,
    initialValue: string | null
}
