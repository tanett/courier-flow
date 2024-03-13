import { createBrowserRouter, Navigate } from 'react-router-dom';
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

export const router = createBrowserRouter([

    // Main page
    {
        path: routerPaths.home,
        element: <MainPage/>,
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
                element: <LazyProductsPage/>,
            },
            {
                path: routerPaths.stores,
                element: <LazyStoresPage/>,
            },
            {
                path: routerPaths.cashDesks,
                element: <LazyCashDesksPage/>,
            },
            {
                path: routerPaths.terminals,
                element: <LazyTerminalsPage/>,
            },
            {
                path: routerPaths.orders,
                element: <LazyOrdersPage/>,
            },
            {
                path: routerPaths.users,
                element: <LazyUsersPage/>,
            },
            {
                path: routerPaths.users_create,
                element: <LazyUsersCreatePage/>,
            },
            {
                path: routerPaths.users_edit,
                element: <LazyUsersEditPage/>,
            },
            {
                path: routerPaths.users_details,
                element: <LazyUsersDetailsPage/>,
            },
            {
                path: routerPaths.roles,
                element: <LazyRolesPage/>,
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
