import { typeRetailProduct } from 'entities-project/retail-products/model/types';
import type { UseFormReturnType } from '@mantine/form';
import { typeProductInCart } from 'features/orders-create/types/types';

export type typeOrdersEdit={}
export type typeProductInCartWithMarkedLabels = typeProductInCart & {markedLabels: string[]}
