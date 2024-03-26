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
    addUserPermissions,
    editLimitedStoresPermissions,
    editUserPermissions,
    readCashDesksPermissions,
    readOrdersPermissions,
    readProductsPermissions, readRolesPermissions,
    readStoresPermissions,
    readTerminalPermissions,
    readUserPermissions
} from 'app/config/permissions-config';
import { LazyProductsCreatePage } from 'pages/products-create-page';

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
                path: routerPaths.products,
                element: <WithPermissionsRouts permissions={readProductsPermissions}><LazyProductsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.products_create,
                element: <WithPermissionsRouts permissions={readProductsPermissions}><LazyProductsCreatePage/></WithPermissionsRouts>,
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
                element: <WithPermissionsRouts permissions={readProductsPermissions}><LazyStoresDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.cashDesks,
                element: <WithPermissionsRouts permissions={readCashDesksPermissions}><LazyCashDesksPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.terminals,
                element: <WithPermissionsRouts permissions={readTerminalPermissions}><LazyTerminalsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.terminals_details,
                element: <WithPermissionsRouts permissions={readTerminalPermissions}><LazyTerminalsDetailsPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.orders,
                element: <WithPermissionsRouts permissions={readOrdersPermissions}><LazyOrdersPage/></WithPermissionsRouts>,
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
