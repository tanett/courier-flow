import { createPath } from '../utils/path-creator';

export enum pathSections {

    // Auth section
    auth = 'auth',
    firstLogin = 'first-login',
    forgotPassword = 'forgot-password',
    restorePassword = 'restore-password',

    // Header section
    dashboard = 'dashboard',
    reports = 'reports',
    products = 'products',
    cashDesks = 'cash-desks',
    terminals = 'terminals',
    orders = 'orders',
    supportCenters = 'support-centers',
    supportRequests = 'support-requests',
    users = 'users',
    roles = 'roles',
    archive = 'archive',
    profile = 'profile',
    create = 'create',
    edit = 'edit',
    id = ':id',
    userId = ':userId',
    userName = ':userName',
    storeId = ':storeId',
    storeName = ':storeName',
    terminalId = ':terminalId',
    serialNumber = ':serialNumber',
    name = ':name',
    stores = 'stores',
    common = 'common',
    settings = 'settings',
}

export enum pathNames {
    home = 'home',
    login = 'login',
    firstLogin = 'firstLogin',
    forgotPassword = 'forgotPassword',
    restorePassword = 'restorePassword',
    dashboard = 'dashboard',

    reports = 'reports',
    products = 'products',
    products_create = 'products_create',
    cashDesks = 'cashDesks',
    terminals = 'terminals',
    terminals_details = 'terminals_details',
    orders = 'orders',
    supportRequests = 'supportRequests',
    roles = 'roles',
    stores = 'stores',
    stores_edit = 'stores_edit',
    stores_details = 'stores_details',

    profile = 'profile',

    users = 'users',
    users_create = 'users_create',
    users_edit = 'users_edit',
    users_details = 'users_details',

    settings = 'settings',
}

export const routerPaths: Record<pathNames, string> = {
    [pathNames.home]: createPath([]),

    // Auth section
    [pathNames.login]: createPath([ pathSections.auth ]),
    [pathNames.firstLogin]: createPath([ pathSections.auth, pathSections.firstLogin ]),
    [pathNames.forgotPassword]: createPath([ pathSections.auth, pathSections.forgotPassword ]),
    [pathNames.restorePassword]: createPath([ pathSections.auth, pathSections.restorePassword ]),

    // Header section
    [pathNames.dashboard]: createPath([ pathSections.dashboard ]),

    [pathNames.reports]: createPath([ pathSections.dashboard, pathSections.reports ]),

    [pathNames.products]: createPath([ pathSections.dashboard, pathSections.products ]),
    [pathNames.products_create]: createPath([ pathSections.dashboard, pathSections.products , pathSections.create]),

    [pathNames.cashDesks]: createPath([ pathSections.dashboard, pathSections.cashDesks ]),

    [pathNames.terminals]: createPath([ pathSections.dashboard, pathSections.terminals ]),
    [pathNames.terminals_details]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.id, pathSections.serialNumber]),

    [pathNames.orders]: createPath([ pathSections.dashboard, pathSections.orders ]),

    [pathNames.supportRequests]: createPath([ pathSections.dashboard, pathSections.supportRequests ]),

    [pathNames.users]: createPath([ pathSections.dashboard, pathSections.users ]),
    [pathNames.users_create]: createPath([ pathSections.dashboard, pathSections.users, pathSections.create ]),
    [pathNames.users_edit]: createPath([ pathSections.dashboard, pathSections.users, pathSections.id, pathSections.edit ]),
    [pathNames.users_details]: createPath([ pathSections.dashboard, pathSections.users, pathSections.id, pathSections.userName ]),

    [pathNames.roles]: createPath([ pathSections.dashboard, pathSections.roles ]),

    [pathNames.stores]: createPath([ pathSections.dashboard, pathSections.stores ]),
    [pathNames.stores_edit]: createPath([ pathSections.dashboard, pathSections.stores, pathSections.id, pathSections.edit ]),
    [pathNames.stores_details]: createPath([ pathSections.dashboard, pathSections.stores, pathSections.id, pathSections.storeName ]),

    [pathNames.settings]: createPath([ pathSections.dashboard, pathSections.settings ]),

    [pathNames.profile]: createPath([ pathSections.dashboard, pathSections.profile ]),
};
