import { typeStoreListChecked } from 'features/products-import/ui/select-stores/types';
import { PRODUCT_IMPORT_TYPE_REQUEST } from '../../../entities/products/api/types';


export type typeOptions = {
    type: PRODUCT_IMPORT_TYPE_REQUEST,
    stores?: { isAllSelected: boolean, countStores: number, selectedStores: typeStoreListChecked[] }

}
