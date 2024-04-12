import { typeUseUrlParams } from 'shared/hooks/use-url-params/types';
import { typeSearchFilterProductExtended } from '../../../entities/products/api/types';

export const getProductsFiltersFromUrl = (urlParams: typeUseUrlParams) => {
    const tempFilter: typeSearchFilterProductExtended = { archived: false };

    if (urlParams.searchPhrase) tempFilter.searchText = urlParams.searchPhrase;

    const storeId = urlParams.getFilterValue('storeId');
    if (storeId && typeof storeId === 'string') tempFilter.storeIds = [ storeId ];
    const barcode = urlParams.getFilterValue('barcode');
    if (barcode && typeof barcode === 'string') tempFilter.barcodes = [ barcode ];
    const categoryId = urlParams.getFilterValue('categoryId');
    if (categoryId && typeof categoryId === 'string') tempFilter.categoriesIds = [ categoryId ];
    const piece = urlParams.getFilterValue('piece');
    if (piece && typeof piece === 'string') tempFilter.piece = piece === 'true';
    const marked = urlParams.getFilterValue('marked');
    if (marked && typeof marked === 'string') tempFilter.marked = marked === 'true';

    return tempFilter
}
