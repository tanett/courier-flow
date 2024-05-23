import { typeMainMenuItemConfig } from '../types/types';
import { pathNames, routerPaths } from '../../../app/config/router-paths';
import { Trans } from '@lingui/macro';
import {
    ChartBarIcon as ReportsIconOutline,
    CalculatorIcon as CalculatorIconOutline,
    Squares2X2Icon as ProductsIconOutline,
    ShoppingCartIcon as ShoppingCartIconOutline,
    TruckIcon as TruckIconOutline,
    UserIcon as UserIconOutline,
    UsersIcon as UsersIconOutline,
    Cog6ToothIcon as Cog6ToothIconOutline
} from '@heroicons/react/24/outline';
import {
    ChartBarIcon as ReportsIconSolid,
    Squares2X2Icon as ProductsIconSolid,
    CalculatorIcon as CalculatorIconSolid,
    ShoppingCartIcon as ShoppingCartIconSolid,
    TruckIcon as TruckIconSolid,
    UserIcon as UserIconSolid,
    UsersIcon as UsersIconSolid,
    Cog6ToothIcon as Cog6ToothIconSolid
} from '@heroicons/react/24/solid';
import {
    readAdvancesPermissions,
    readCategoryPermissions, readCreditsPermissions,
    readMerchantPermissions,
    readOrdersPermissions,
    readProductsPermissions,
    readRefundsPermissions,
    readSalesPermissions,
    readStoresPermissions,
    readTerminalPermissions,
    readUserPermissions, readZReportsPermissions
} from '../../../app/config/permissions-config';
import { CashDeskIconSolid } from 'shared/ui/svg-custom-icons/cashDesk-icon-solid/cash-desk-icon-solid';
import { CashDeskIconOutline } from 'shared/ui/svg-custom-icons/cashDesk-icon-outline/cash-desk-icon-outline';


export const mainMenuConfig: typeMainMenuItemConfig[] = [
    {
        id: pathNames.reports,
        name: <Trans>Reports</Trans>,
        icon: <ReportsIconOutline/>,
        activeIcon: <ReportsIconSolid/>,
        path: routerPaths.reports,
        allowPermissions: [],
        children: [
            {  id: pathNames.sales,
                name: <Trans>Sales</Trans>,
                path: routerPaths.sales,
                allowPermissions: readSalesPermissions,
            },
            {  id: pathNames.refunds,
                name: <Trans>Refunds</Trans>,
                path: routerPaths.refunds,
                allowPermissions: readRefundsPermissions,
            },
            {  id: pathNames.z_reports,
                name: <Trans>Z-reports</Trans>,
                path: routerPaths.z_reports,
                allowPermissions: readZReportsPermissions,
            },
            {  id: pathNames.advances,
                name: <Trans>Advances</Trans>,
                path: routerPaths.advances,
                allowPermissions: readAdvancesPermissions,
            },
            {  id: pathNames.credits,
                name: <Trans>Credits</Trans>,
                path: routerPaths.credits,
                allowPermissions: readCreditsPermissions,
            },
        ]
    },
    {
        id: pathNames.products,
        name: <Trans>Products</Trans>,
        icon: <ProductsIconOutline/>,
        activeIcon: <ProductsIconSolid/>,
        path: routerPaths.products,
        allowPermissions: readProductsPermissions,
        children: [
            {
                id: pathNames.products_list,
                name: <Trans>Products</Trans>,
                path: routerPaths.products_list,
                allowPermissions: readProductsPermissions,
            },
            {
                id: pathNames.products_categories,
                name: <Trans>Categories</Trans>,
                path: routerPaths.products_categories,
                allowPermissions: readCategoryPermissions,
            },
        ]
    },
    {
        id: pathNames.stores,
        name: <Trans>Stores</Trans>,
        icon: <ShoppingCartIconOutline/>,
        activeIcon: <ShoppingCartIconSolid/>,
        path: routerPaths.stores,
        allowPermissions: readStoresPermissions,
    },
    {
        id: pathNames.cashDesks,
        name: <Trans>Cash desks</Trans>,
        icon: <CashDeskIconOutline/>,
        activeIcon: <CashDeskIconSolid/>,
        path: routerPaths.cashDesks,
        allowPermissions: [],
    },
    {
        id: pathNames.terminals,
        name: <Trans>Terminals</Trans>,
        icon: <CalculatorIconOutline/>,
        activeIcon: <CalculatorIconSolid/>,
        path: routerPaths.terminals,
        allowPermissions: readTerminalPermissions,
    },
    {
        id: pathNames.orders,
        name: <Trans>Orders</Trans>,
        icon: <TruckIconOutline/>,
        activeIcon: <TruckIconSolid/>,
        path: routerPaths.orders,
        allowPermissions: readOrdersPermissions,
    },
    /* {
        id: pathNames.supportCenters,
        name: <Trans>CTS</Trans>,
        svg-custom-icons: <LifebuoyIconOutline/>,
        activeIcon: <LifebuoyIconSolid/>,
        path: routerPaths.supportCenters,
        allowPermissions: ,
    }, */

    {
        id: pathNames.users,
        name: <Trans>Users</Trans>,
        icon: <UserIconOutline/>,
        activeIcon: <UserIconSolid/>,
        path: routerPaths.users,
        allowPermissions: readUserPermissions,
    },
    {
        id: pathNames.roles,
        name: <Trans>Roles</Trans>,
        icon: <UsersIconOutline/>,
        activeIcon: <UsersIconSolid/>,
        path: routerPaths.roles,
        allowPermissions: [ ],
    },
    {
        id: pathNames.settings,
        name: <Trans>Settings</Trans>,
        icon: <Cog6ToothIconOutline/>,
        activeIcon: <Cog6ToothIconSolid/>,
        path: routerPaths.settings,
        allowPermissions: [] // todo fix it
    },

];
