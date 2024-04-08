import type { UseFormReturnType } from '@mantine/form';
import { typeProductForm } from 'features/product-create/types/types';

export type typeBarcodesInputForProductForm = {
    form: UseFormReturnType<typeProductForm>
}
