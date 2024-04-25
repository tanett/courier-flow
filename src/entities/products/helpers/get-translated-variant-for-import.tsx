import { Trans } from '@lingui/macro';
import { PRODUCT_IMPORT_TYPE_REQUEST } from '../../../entities/products/api/types';

export const getTranslatedTypeForImports = (type: PRODUCT_IMPORT_TYPE_REQUEST) => {

    switch (type) {

    case PRODUCT_IMPORT_TYPE_REQUEST.PRODUCT_CATALOG :
        return <Trans>To catalog</Trans>;
    case PRODUCT_IMPORT_TYPE_REQUEST.RETAIL_PRODUCT_FROM_EXCEL :
        return <Trans>To the stores indicated in the Excel file</Trans>;
    case PRODUCT_IMPORT_TYPE_REQUEST.RETAIL_PRODUCT_FROM_FILTER :
        return <Trans>To selected stores</Trans>;
    default :
        return type;

    }

};
