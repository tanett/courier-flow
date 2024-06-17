import type { UseFormReturnType } from '@mantine/form';
import { typeCategory } from '../../../entities/category/model/types';

export type typeTerminalConfigurationsEditForm = {
    name: string,
    storeIds: string[]
    terminalIds: string[]
    productCategory: typeProductCategoryChecked[]
    availableModules: string[]
}

export type typeProductCategoryChecked = typeCategory & { checked: boolean }


export enum CONFIGURATION_TYPE_TABS {
    STORES = 'stores',
    CATEGORIES = 'categories',
    MODULES = 'modules',
}

export type typeReturnForm<F> = UseFormReturnType<F, (values: F) => F>
