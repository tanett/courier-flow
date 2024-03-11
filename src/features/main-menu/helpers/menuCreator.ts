import { typeMainMenuItem, typeMainMenuItemConfig } from '../types/types';

export const menuCreator = (menuConfig: typeMainMenuItemConfig[], permissions: string[] = []): typeMainMenuItem[] => {

    return menuConfig
        .filter(item => {

            const contain = permissions.findIndex(subItem => item.allowPermissions.includes(subItem));
            return item.allowPermissions.length > 0 ? contain >= 0 : true;

        })
        .map(item => {

            const newItem: typeMainMenuItem = { ...item };
            if ('allowPermissions' in newItem) delete newItem.allowPermissions;

            return newItem;

        });

};
