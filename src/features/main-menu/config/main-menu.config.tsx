import { typeMainMenuItemConfig } from '../types/types';
import { pathNames, routerPaths } from '../../../app/config/router-paths';
import { Trans } from '@lingui/macro';
import {
    ArchiveBoxIcon as ArchiveBoxIconOutline,
    // BellIcon as BellIconOutline,
    ChartBarIcon as ReportsIconOutline,
    CalculatorIcon as CalculatorIconOutline,
    Squares2X2Icon as ProductsIconOutline,

    // LifebuoyIcon as LifebuoyIconOutline,
    ShoppingCartIcon as ShoppingCartIconOutline,
    BanknotesIcon as BanknotesIconOutline,
    TruckIcon as TruckIconOutline,
    UserIcon as UserIconOutline,
    UsersIcon as UsersIconOutline,
} from '@heroicons/react/24/outline';
import {
    ArchiveBoxIcon as ArchiveBoxIconSolid,
    // BellIcon as BellIconSolid,
    ChartBarIcon as ReportsIconSolid,
    Squares2X2Icon as ProductsIconSolid,
    BanknotesIcon as BanknotesIconSolid,
    CalculatorIcon as CalculatorIconSolid,
    // LifebuoyIcon as LifebuoyIconSolid,
    ShoppingCartIcon as ShoppingCartIconSolid,
    TruckIcon as TruckIconSolid,
    UserIcon as UserIconSolid,
    UsersIcon as UsersIconSolid
} from '@heroicons/react/24/solid';
import { readMerchantPermissions, readOrdersPermissions, readProductsPermissions, readStoresPermissions, readTerminalPermissions, readUserPermissions } from '../../../app/config/permissions-config';
import { CashDeskIconSolid } from 'shared/ui/CashDesk-Icon-Solid/cash-desk-icon-solid';
import { CashDeskIconOutline } from 'shared/ui/CashDesk-Icon-Outline/cash-desk-icon-outline';


export const mainMenuConfig: typeMainMenuItemConfig[] = [
    {
        id: pathNames.reports,
        name: <Trans>Reports</Trans>,
        icon: <ReportsIconOutline/>,
        activeIcon: <ReportsIconSolid/>,
        path: routerPaths.reports,
        allowPermissions: [],
    },
    {
        id: pathNames.products,
        name: <Trans>Products</Trans>,
        icon: <ProductsIconOutline/>,
        activeIcon: <ProductsIconSolid/>,
        path: routerPaths.products,
        allowPermissions: readProductsPermissions,
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
        icon: <LifebuoyIconOutline/>,
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
        icon: <UserIconOutline/>,
        activeIcon: <UserIconSolid/>,
        path: routerPaths.settings,
        allowPermissions: [] // todo fix it
    },

];
