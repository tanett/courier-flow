import { UseFormReturnType } from '@mantine/form';
import { typeTerminalsFilterForm } from 'features/terminals-list-filter/types/types';

export type typeButtonBlockForSelectBlockUnblock = {
    form: UseFormReturnType<typeTerminalsFilterForm>,
    path: keyof typeTerminalsFilterForm,
    label: string,
    titleBtnLeft: string,
    titleBtnRight: string
}
