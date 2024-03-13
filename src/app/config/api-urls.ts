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
    STORES_PATCH= '/api/v1/stores',
    STORES_GET = '/api/v1/stores/{id}',

}
