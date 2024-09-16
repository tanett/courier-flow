import { typeMainMenuItemConfig } from '../types/types';
import { pathNames, routerPaths } from '../../../app/config/router-paths';
import { Trans } from '@lingui/macro';
import {

    TruckIcon as TruckIconOutline,

} from '@heroicons/react/24/outline';
import {

    TruckIcon as TruckIconSolid,

} from '@heroicons/react/24/solid';
import {

    readOrdersPermissions,

} from '../../../app/config/permissions-config';



export const mainMenuConfig: typeMainMenuItemConfig[] = [

    {
        id: pathNames.orders,
        name: <Trans>Orders</Trans>,
        icon: <TruckIconOutline/>,
        activeIcon: <TruckIconSolid/>,
        path: routerPaths.orders,
        allowPermissions: readOrdersPermissions,

    },

];
