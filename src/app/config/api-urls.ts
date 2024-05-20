export enum API_URLS {
    AUTH_LOGIN = '/api/v1/auth/users/access-token',
    AUTH_REFRESH = '/api/v1/auth/users/access-token/refresh',

    USER_GET_CURRENT = '/api/v1/actors/current/with-permissions',
    USER_PATCH = '/api/v1/users',
    USER_CHANGE_PASSWORD = '/api/v1/users/change-password',
    USER_FORGOT_PASSWORD = '/api/v1/users/send-reset-password-link-to-email',
    USER_CREATE = '/api/v1/users',
    USER_ARCHIVE = '/api/v1/users/archive',
    USER_GET = '/api/v1/users/{id}',
    USER_LIST_SEARCH = '/api/v1/users/search',
    USER_LIST_EXTENDED_SEARCH = '/api/v1/users/extended-search',

    INDUSTRIES_SEARCH = '/api/v1/industries/search',

    TERMINAL_LIST_SEARCH = '/api/v1/terminals/search',
    TERMINAL_LIST_SEARCH_EXTENDED = '/api/v1/terminals/extended-search',
    TERMINAL_CREATE = '/api/v1/terminals',
    TERMINAL_PATCH = '/api/v1/terminals',
    TERMINAL_ARCHIVE = '/api/v1/terminals/archive',
    TERMINAL_GET = '/api/v1/terminals/{id}',


    ROLES_SEARCH = '/api/v1/roles/search',
    ROLES_SEARCH_ONE = '/api/v1/roles/search/one',
    ROLES_SEARCH_EXTENDED = '/api/v1/roles/extended-search',

    STORES_SEARCH = '/api/v1/stores/search',
    STORES_SEARCH_EXTENDED = '/api/v1/stores/extended-search',
    STORES_PATCH= '/api/v1/stores',
    STORES_GET = '/api/v1/stores/{id}',
    STORES_ARCHIVE = '/api/v1/stores/archive',

    PRODUCTS_SEARCH = '/api/v1/products/search',
    PRODUCTS_SEARCH_EXTENDED = '/api/v1/products/extended-search',
    PRODUCTS_PATCH= '/api/v1/products',
    PRODUCTS_PATCH_BATCH= '/api/v1/products/batch',
    PRODUCTS_CREATE= '/api/v1/products',
    PRODUCTS_GET = '/api/v1/products/{id}',
    PRODUCTS_ARCHIVE = '/api/v1/products/archive',
    PRODUCTS_ADDITIONAL_FIELD_INFO_GET = 'api/v1/products/additional-fields/info',
    PRODUCTS_CHANGE_ALL_VAT = '/api/v1/products/change-all-vat',
    PRODUCTS_IMPORT = '/api/v1/products/import',
    PRODUCTS_DOWNLOAD_TEMPLATE = '/api/v1/products/import/template?importType={type}',

    PRODUCTS_EXPORT = '/api/v1/products/export',

    RETAIL_PRODUCTS_SEARCH = '/api/v1/retail-products/search',
    RETAIL_PRODUCTS_PATCH= '/api/v1/retail-products',
    RETAIL_PRODUCTS_CREATE= '/api/v1/retail-products',
    RETAIL_PRODUCTS_GET = '/api/v1/retail-products/{id}',
    RETAIL_PRODUCTS_DELETE = '/api/v1/retail-products',
    RETAIL_PRODUCTS_CHANGE_PRICES_IN_ALL_STORES= '/api/v1/retail-products/change-price',

    RETAIL_PRODUCTS_EXPORT = '/api/v1/retail-products/export',

    IMPORTS_BY_ID = '/api/v1/imports/{id}',
    IMPORTS_SEARCH = '/api/v1/imports/search',

    EXPORTS_SEARCH = '/api/v1/exports/search',
    EXPORTS_BY_ID = '/api/v1/exports/{id}',

    DOWNLOAD_EXPORT_FILE_BY_ID = '/api/v1/exports/{id}/download-file',

    CATEGORIES_SEARCH = '/api/v1/product-categories/search',
    CATEGORIES_SEARCH_EXTENDED = '/api/v1/product-categories/extended-search',
    CATEGORIES_PATCH= '/api/v1/product-categories',
    CATEGORIES_CREATE= '/api/v1/product-categories',
    CATEGORIES_GET = '/api/v1/product-categories/{id}',
    CATEGORIES_DELETE = '/api/v1/product-categories',

    SALES_SHORT_SEARCH = '/api/v1/sales/search/short',
    SALES_SHORT_SEARCH_EXTENDED = '/api/v1/sales/extended-search',
    SALES_GET = '/api/v1/sales/{id}',
    SALES_SHORT_GET = '/api/v1/sales/short/{id}',

    REFUNDS_SEARCH = '/api/v1/refunds/search',
    REFUNDS_GET = '/api/v1/refunds/{id}',

}
