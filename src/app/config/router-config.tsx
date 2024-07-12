import { createBrowserRouter } from 'react-router-dom';
import { routerPaths } from './router-paths';
import { LazyRestorePasswordPage } from 'pages/restore-password-page';
import { LazyForgotPasswordPage } from 'pages/forgot-password-page';
import { AuthLayout } from 'shared/layouts/auth-layout/auth-layout';
import { DashboardLayout } from 'shared/layouts/dashboard-layout/dashboard-layout';
import { LazyTerminalsPage } from 'pages/terminals-page';
import { LazyProfilePage } from 'pages/profile-page';
import { LazyNotFoundPage } from '../../pages/not-found-page';
import React from 'react';
import { WithProtectedRouts } from '../providers/with-protected-routs/with-protected-routs';
import LoginPage from '../../pages/login-page/ui/login-page';
import { MainPage } from '../../pages/main-page';
import { LazyUsersPage } from '../../pages/users-page';
import {LazyUsersCreatePage} from "../../pages/users-create-page";
import {LazyUsersEditPage} from "../../pages/users-edit-page";
import {LazyFirstLoginPage} from "../../pages/first-login-page";
import { LazyReportsPage } from 'pages/reports-page';
import { LazyProductsPage } from 'pages/products-page';
import { LazyStoresPage } from 'pages/stores-page';
import { LazyCashDesksPage } from 'pages/cash-desks-page';
import { LazyOrdersPage } from 'pages/orders-page';
import { LazySettingsPage } from 'pages/settings-page';
import { LazyRolesPage } from 'pages/roles-page';
import { LazyUsersDetailsPage } from 'pages/users-details-page';
import { LazyTerminalsDetailsPage } from 'pages/terminals-details-page';
import { LazyStoresEditPage } from 'pages/stores-edit-page';
import { LazyStoresDetailsPage } from 'pages/stores-details-page';
import { WithPermissionsRouts } from 'app/providers/with-permissions-routs/with-permissions-routs';
import {
    addCategoryPermissions, addProductsPermissions, addTerminalConfigurationsPermissions,
    addUserPermissions, editCategoryPermissions,
    editLimitedStoresPermissions, editProductsPermissions, editTerminalConfigurationsPermissions,
    editUserPermissions, readAdvancesPermissions,
    readCashDesksPermissions, readCategoryPermissions, readCreditsPermissions, readWorkingShiftsPermissions,
    readOrdersPermissions,
    readProductsPermissions, readRefundsPermissions, readRolesPermissions, readSalesPermissions,
    readStoresPermissions, readTerminalConfigurationsPermissions,
    readTerminalPermissions,
    readUserPermissions, readZReportsPermissions, editOrdersPermissions, addOrdersPermissions
} from 'app/config/permissions-config';
import { LazyProductsCreatePage } from 'pages/products-create-page';
import { LazyCategoriesPage } from 'pages/categories-page';
import { LazyCategoriesCreatePage } from 'pages/categories-create-page';
import { LazyCategoriesEditPage } from 'pages/categories-edit-page';
import { LazyProductsEditPage } from 'pages/products-edit-page';
import { LazyProductsDetailsPage } from 'pages/products-details-page';
import { LazySalesPage } from 'pages/sales-page';
import { LazyRefundsPage } from "../../pages/refunds-page";
import { LazyRefundDetailsPage } from "../../pages/refund-detais-page";
import { LazySalesDetailsPage } from 'pages/sales-details-page';
import { LazySoldProductDetailsPage } from 'pages/sold-product-details-page';
import { LazyZReportsPage } from 'pages/z-reports-page';
import { LazyAdvancesPage } from 'pages/advances-page';
import { LazyCreditsPage } from 'pages/credits-page';
import { LazyTerminalConfigurationPage } from 'pages/terminal-configurations-page';
import { LazyWorkingShiftsPage } from 'pages/working-shifts-page';
import { LazyTerminalConfigurationCreatePage } from 'pages/terminal-configurations-create-page';
import { LazyTerminalConfigurationEditPage } from 'pages/terminal-configurations-edit-page';
import { LazyTerminalConfigurationsDetailsPage } from 'pages/terminal-configurations-details-page';
import { LazyStoresUsersEditPage } from 'pages/stores-users-edit-page';
import { LazyAdvancesDetailsPage } from 'pages/advances-details-page';
import { LazyAdvancesSoldProductDetailsPage } from 'pages/advances-sold-product-details-page';
import { LazyCreditsDetailsPage } from 'pages/credits-details-page';
import { LazyWorkingShiftsDetailsPage } from 'pages/working-shifts-details-page';
import { LazyOrdersCreatePage } from 'pages/orders-create-page';
import { LazyOrdersDetailsPage } from 'pages/orders-details-page';

function LazyOrdersEditPage() {
    return null;
}

export const router = createBrowserRouter([

    // Main page
    {
        path: routerPaths.home,
        element: <MainPage/>,
    },
    {
        path: routerPaths.login,
        element: <AuthLayout/>,
        children: [
            {
                index: true,
                element: <LoginPage/>,
            },
            {
                path: routerPaths.firstLogin,
                element: <LazyFirstLoginPage/>,
            },
            {
                path: routerPaths.forgotPassword,
                element: <LazyForgotPasswordPage/>,
            },
            {
                path: routerPaths.restorePassword,
                element: <LazyRestorePasswordPage/>,
            }
        ],
    },

    // Auth routs
    {
        path: routerPaths.login,
        element: <AuthLayout/>,
        children: [
            {
                index: true,
                element: <LoginPage/>,
            },
            {
                path: routerPaths.firstLogin,
                element: <LazyFirstLoginPage/>,
            },
            {
                path: routerPaths.forgotPassword,
                element: <LazyForgotPasswordPage/>,
            },
            {
                path: routerPaths.restorePassword,
                element: <LazyRestorePasswordPage/>,
            }
        ],
    },

    // Header routs
    {
        path: routerPaths.dashboard,
        element: <WithProtectedRouts><DashboardLayout/></WithProtectedRouts>,
        children: [
            {
                path: routerPaths.reports,
                element: <LazyReportsPage/>,
            },
            {
                path: routerPaths.sales,
                element: <WithPermissionsRouts permissions={readSalesPermissions}><LazySalesPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.sales_details,
                element: <WithPermissionsRouts permissions={readSalesPermissions}><LazySalesDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.sold_product_details,
                element: <WithPermissionsRouts permissions={readSalesPermissions}><LazySoldProductDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.refunds,
                element: <WithPermissionsRouts permissions={readRefundsPermissions}><LazyRefundsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.refunds_details,
                element: <WithPermissionsRouts permissions={readRefundsPermissions}><LazyRefundDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.z_reports,
                element: <WithPermissionsRouts permissions={readZReportsPermissions}><LazyZReportsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.advances,
                element: <WithPermissionsRouts permissions={readAdvancesPermissions}><LazyAdvancesPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.advances_details,
                element: <WithPermissionsRouts permissions={readSalesPermissions}><LazyAdvancesDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.advances_sold_product_details,
                element: <WithPermissionsRouts permissions={readSalesPermissions}><LazyAdvancesSoldProductDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.credits,
                element: <WithPermissionsRouts permissions={readCreditsPermissions}><LazyCreditsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.credits_details,
                element: <WithPermissionsRouts permissions={readCreditsPermissions}><LazyCreditsDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.products_list,
                element: <WithPermissionsRouts permissions={readProductsPermissions}><LazyProductsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.products_create,
                element: <WithPermissionsRouts permissions={addProductsPermissions}><LazyProductsCreatePage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.products_edit,
                element: <WithPermissionsRouts permissions={editProductsPermissions}><LazyProductsEditPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.products_details,
                element: <WithPermissionsRouts permissions={readProductsPermissions}><LazyProductsDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.products_categories,
                element: <WithPermissionsRouts permissions={readCategoryPermissions}><LazyCategoriesPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.products_categories_create,
                element: <WithPermissionsRouts permissions={addCategoryPermissions}><LazyCategoriesCreatePage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.products_categories_edit,
                element: <WithPermissionsRouts permissions={editCategoryPermissions}><LazyCategoriesEditPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.stores,
                element: <WithPermissionsRouts permissions={readStoresPermissions}><LazyStoresPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.stores_edit,
                element: <WithPermissionsRouts permissions={editLimitedStoresPermissions}><LazyStoresEditPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.stores_details,
                element: <WithPermissionsRouts permissions={readStoresPermissions}><LazyStoresDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.stores_details_users_edit,
                element: <WithPermissionsRouts permissions={editUserPermissions}><LazyStoresUsersEditPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.cashDesks,
                element: <WithPermissionsRouts permissions={readCashDesksPermissions}><LazyCashDesksPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.terminals_list,
                element: <WithPermissionsRouts permissions={readTerminalPermissions}><LazyTerminalsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.terminals_details,
                element: <WithPermissionsRouts permissions={readTerminalPermissions}><LazyTerminalsDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.terminals_configurations,
                element: <WithPermissionsRouts permissions={readTerminalConfigurationsPermissions}><LazyTerminalConfigurationPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.terminals_configurations_create,
                element: <WithPermissionsRouts permissions={addTerminalConfigurationsPermissions}><LazyTerminalConfigurationCreatePage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.terminals_configurations_edit,
                element: <WithPermissionsRouts permissions={editTerminalConfigurationsPermissions}><LazyTerminalConfigurationEditPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.terminals_configurations_details,
                element: <WithPermissionsRouts permissions={readTerminalConfigurationsPermissions}><LazyTerminalConfigurationsDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.working_shifts,
                element: <WithPermissionsRouts permissions={readWorkingShiftsPermissions}><LazyWorkingShiftsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.working_shifts_details,
                element: <WithPermissionsRouts permissions={readWorkingShiftsPermissions}><LazyWorkingShiftsDetailsPage/></WithPermissionsRouts>,
            },

            {
                path: routerPaths.orders_list,
                element: <WithPermissionsRouts permissions={readOrdersPermissions}><LazyOrdersPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.orders_create,
                element: <WithPermissionsRouts permissions={addOrdersPermissions}><LazyOrdersCreatePage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.orders_edit,
                element: <WithPermissionsRouts permissions={editOrdersPermissions}><LazyOrdersEditPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.orders_details,
                element: <WithPermissionsRouts permissions={readOrdersPermissions}><LazyOrdersDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.users,
                element: <WithPermissionsRouts permissions={readUserPermissions}><LazyUsersPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.users_create,
                element: <WithPermissionsRouts permissions={addUserPermissions}><LazyUsersCreatePage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.users_edit,
                element: <WithPermissionsRouts permissions={editUserPermissions}><LazyUsersEditPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.users_details,
                element: <WithPermissionsRouts permissions={readUserPermissions}><LazyUsersDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.roles,
                element: <WithPermissionsRouts permissions={readRolesPermissions}><LazyRolesPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.settings,
                element: <LazySettingsPage/>,
            },
            {
                path: routerPaths.profile,
                element: <LazyProfilePage/>,
            }
        ],
    },

    // Not fount rout
    {
        path: '*',
        element: <LazyNotFoundPage/>,
    }
]);
