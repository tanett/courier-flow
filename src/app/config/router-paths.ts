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
    sales = 'sales',
    refunds = 'refunds',
    zReports = 'z-reports',
    advances = 'advances',
    credits = 'credits',
    products = 'products',
    products_list = 'products_list',
    categories = 'categories',
    cashDesks = 'cash-desks',
    encashment = 'encashment',
    terminals = 'terminals',
    terminals_list = 'terminals_list',
    terminals_configurations = 'terminals_configurations',
    working_shifts = 'working_shifts',
    orders = 'orders',
    orders_list = 'orders_list',
    orders_clients='orders_clients',
    supportCenters = 'support-centers',
    supportRequests = 'support-requests',
    users = 'users',
    roles = 'roles',
    archive = 'archive',
    profile = 'profile',
    settings = 'settings',

    // Actions
    create = 'create',
    edit = 'edit',
    common = 'common',

    // Path params
    id = ':id',
    refundNumber = ':refundNumber',
    zReportNumber = ':zReportNumber',
    userId = ':userId',
    userName = ':userName',
    storeId = ':storeId',
    storeName = ':storeName',
    terminalId = ':terminalId',
    serialNumber = ':serialNumber',
    name = ':name',
    stores = 'stores',
    publicId = ':publicId',
    cashDeskId = ':cashDeskId',
    cashDeskName = ':cashDeskName',
}

export enum pathNames {
    home = 'home',
    login = 'login',
    firstLogin = 'firstLogin',
    forgotPassword = 'forgotPassword',
    restorePassword = 'restorePassword',
    dashboard = 'dashboard',

    reports = 'reports',
    sales = 'sales',
    sales_details = 'sales_details',
    sold_product_details = 'sold_product_details',

    refunds = 'refunds',
    refunds_details = 'refunds_details',

    z_reports = 'z_reports',
    z_reports_details = 'z_reports_details',

    advances = 'advances',
    advances_details = 'advances_details',
    advances_sold_product_details='advances_sold_product_details',

    credits = 'credits',
    credits_details = 'credits_details',

    products = 'products',
    products_list = 'products_list',
    products_create = 'products_create',
    products_edit = 'products_edit',
    products_details = 'products_details',

    products_categories = 'products_categories',
    products_categories_create = 'products_categories_create',
    products_categories_edit = 'products_categories_edit',

    cashDesks = 'cash_desks',
    cashDeskDetails = 'cash_desks_details',
    cashDesksEdit = 'cash_desks_edit',
    cashDesksCreate = 'cash_desks_create',

    encashment = 'encashment',

    terminals = 'terminals',
    terminals_list = 'terminals_list',
    terminals_details = 'terminals_details',

    terminals_configurations = 'terminals_configurations',
    terminals_configurations_create = 'terminals_configurations_create',
    terminals_configurations_edit = 'terminals_configurations_edit',
    terminals_configurations_details = 'terminals_configurations_details',

    working_shifts = 'working_shifts',
    working_shifts_details = 'working_shifts_details',

    orders = 'orders',
    orders_list='orders_list',
    orders_details='orders_details',
    orders_create = 'orders_create',
    orders_edit = 'orders_edit',
    orders_clients = 'orders_clients',

    supportRequests = 'supportRequests',
    roles = 'roles',

    stores = 'stores',
    stores_edit = 'stores_edit',
    stores_details = 'stores_details',
    stores_details_users_edit = 'stores_details_users_edit',

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

    // reports
    [pathNames.reports]: createPath([ pathSections.dashboard, pathSections.reports ]),

    // sales
    [pathNames.sales]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.sales ]),
    [pathNames.sales_details]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.sales, pathSections.id, pathSections.publicId ]),
    [pathNames.sold_product_details]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.sales, pathSections.id, pathSections.publicId, pathSections.name ]),

    // refunds
    [pathNames.refunds]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.refunds ]),
    [pathNames.refunds_details]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.refunds, pathSections.id, pathSections.refundNumber ]),

    // z_reports
    [pathNames.z_reports]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.zReports ]),
    [pathNames.z_reports_details]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.zReports, pathSections.id, pathSections.zReportNumber ]),

    // Advances
    [pathNames.advances]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.advances ]),
    [pathNames.advances_details]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.advances, pathSections.id]),
    [pathNames.advances_sold_product_details]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.advances, pathSections.id, pathSections.name ]),

    // credits
    [pathNames.credits]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.credits ]),
    [pathNames.credits_details]: createPath([ pathSections.dashboard, pathSections.reports, pathSections.credits, pathSections.id ]),


    // products
    [pathNames.products]: createPath([ pathSections.dashboard, pathSections.products ]),
    [pathNames.products_list]: createPath([ pathSections.dashboard, pathSections.products, pathSections.products_list ]),
    [pathNames.products_create]: createPath([ pathSections.dashboard, pathSections.products, pathSections.create ]),
    [pathNames.products_edit]: createPath([ pathSections.dashboard, pathSections.products, pathSections.id, pathSections.edit ]),
    [pathNames.products_details]: createPath([ pathSections.dashboard, pathSections.products, pathSections.id, pathSections.name ]),

    // category
    [pathNames.products_categories]: createPath([ pathSections.dashboard, pathSections.products, pathSections.categories ]),
    [pathNames.products_categories_create]: createPath([ pathSections.dashboard, pathSections.products, pathSections.categories, pathSections.create ]),
    [pathNames.products_categories_edit]: createPath([ pathSections.dashboard, pathSections.products, pathSections.categories, pathSections.id, pathSections.edit ]),

    // cash desks
    [pathNames.cashDesks]: createPath([ pathSections.dashboard, pathSections.cashDesks ]),
    [pathNames.cashDesksCreate]: createPath([ pathSections.dashboard, pathSections.cashDesks, pathSections.create ]),
    [pathNames.cashDesksEdit]: createPath([ pathSections.dashboard, pathSections.cashDesks, pathSections.cashDeskId, pathSections.edit ]),
    [pathNames.cashDeskDetails]: createPath([ pathSections.dashboard, pathSections.cashDesks, pathSections.cashDeskId, pathSections.cashDeskName ]),

    // encashment
    [pathNames.encashment]: createPath([ pathSections.dashboard, pathSections.encashment ]),

    // terminals
    [pathNames.terminals]: createPath([ pathSections.dashboard, pathSections.terminals ]),
    [pathNames.terminals_list]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.terminals_list  ]),
    [pathNames.terminals_details]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.id, pathSections.serialNumber ]),

    // terminals-configurations
    [pathNames.terminals_configurations]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.terminals_configurations ]),
    [pathNames.terminals_configurations_create]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.terminals_configurations, pathSections.create ]),
    [pathNames.terminals_configurations_edit]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.terminals_configurations, pathSections.id, pathSections.edit ]),
    [pathNames.terminals_configurations_details]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.terminals_configurations, pathSections.id, pathSections.name ]),

    // working_shifts
    [pathNames.working_shifts]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.working_shifts ]),
    [pathNames.working_shifts_details]: createPath([ pathSections.dashboard, pathSections.terminals, pathSections.working_shifts, pathSections.id,  ]),

    // orders
    [pathNames.orders]: createPath([ pathSections.dashboard, pathSections.orders ]),
    [pathNames.orders_list]: createPath([ pathSections.dashboard, pathSections.orders, pathSections.orders_list  ]),
    [pathNames.orders_details]: createPath([ pathSections.dashboard,pathSections.orders,  pathSections.id]),
    [pathNames.orders_edit]: createPath([ pathSections.dashboard,pathSections.orders, pathSections.id, pathSections.edit ]),
    [pathNames.orders_create]: createPath([ pathSections.dashboard, pathSections.orders, pathSections.create]),

    [pathNames.orders_clients]: createPath([ pathSections.dashboard, pathSections.orders, pathSections.orders_clients  ]),

    // support
    [pathNames.supportRequests]: createPath([ pathSections.dashboard, pathSections.supportRequests ]),

    // users
    [pathNames.users]: createPath([ pathSections.dashboard, pathSections.users ]),
    [pathNames.users_create]: createPath([ pathSections.dashboard, pathSections.users, pathSections.create ]),
    [pathNames.users_edit]: createPath([ pathSections.dashboard, pathSections.users, pathSections.id, pathSections.edit ]),
    [pathNames.users_details]: createPath([ pathSections.dashboard, pathSections.users, pathSections.id, pathSections.userName ]),

    // roles
    [pathNames.roles]: createPath([ pathSections.dashboard, pathSections.roles ]),

    //stores
    [pathNames.stores]: createPath([ pathSections.dashboard, pathSections.stores ]),
    [pathNames.stores_edit]: createPath([ pathSections.dashboard, pathSections.stores, pathSections.id, pathSections.storeName, pathSections.edit ]),
    [pathNames.stores_details]: createPath([ pathSections.dashboard, pathSections.stores, pathSections.id, pathSections.storeName ]),
    [pathNames.stores_details_users_edit]: createPath([ pathSections.dashboard, pathSections.stores, pathSections.id, pathSections.storeName, pathSections.userId, pathSections.edit ]),

    //settings
    [pathNames.settings]: createPath([ pathSections.dashboard, pathSections.settings ]),

    // profile
    [pathNames.profile]: createPath([ pathSections.dashboard, pathSections.profile ]),
};
