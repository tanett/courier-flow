import { createBrowserRouter } from 'react-router-dom';
import { routerPaths } from './router-paths';
import { LazyRestorePasswordPage } from 'pages/restore-password-page';
import { LazyForgotPasswordPage } from 'pages/forgot-password-page';
import { AuthLayout } from 'shared/layouts/auth-layout/auth-layout';
import { DashboardLayout } from 'shared/layouts/dashboard-layout/dashboard-layout';

import { LazyProfilePage } from 'pages/profile-page';
import { LazyNotFoundPage } from '../../pages/not-found-page';
import React from 'react';
import { WithProtectedRouts } from '../providers/with-protected-routs/with-protected-routs';
import LoginPage from '../../pages/login-page/ui/login-page';
import { MainPage } from '../../pages/main-page';

import {LazyFirstLoginPage} from "../../pages/first-login-page";

import { LazyOrdersPage } from 'pages/orders-page';

import { WithPermissionsRouts } from 'app/providers/with-permissions-routs/with-permissions-routs';
import {
    readOrdersPermissions,
     editOrdersPermissions, addOrdersPermissions
} from 'app/config/permissions-config';

import { LazyOrdersCreatePage } from 'pages/orders-create-page';
import { LazyOrdersDetailsPage } from 'pages/orders-details-page';
import { LazyOrdersEditPage } from 'pages/orders-edit-page';




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
                index: true,
                path: routerPaths.orders,
                element: <WithPermissionsRouts permissions={readOrdersPermissions}><LazyOrdersPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.orders_edit,
                element:<WithPermissionsRouts permissions={readOrdersPermissions}><LazyOrdersEditPage/></WithPermissionsRouts>,
            },
            {
                path: routerPaths.orders_details,
                element: <WithPermissionsRouts permissions={readOrdersPermissions}><LazyOrdersDetailsPage/></WithPermissionsRouts>,
            },

            {
                path: routerPaths.profile,
                element: <LazyProfilePage/>,
            },

        ],
    },

    // Not fount rout
    {
        path: '*',
        element: <LazyNotFoundPage/>,
    }
]);
