import React from 'react';
import { TransProps } from '@lingui/react';

export interface typeMainMenuItemConfig {
    id: string,
    name: React.ReactElement<React.FC<TransProps>>,
    icon: React.ReactElement,
    activeIcon: React.ReactElement,
    path: string,
    allowPermissions: string[],
    children?: Pick<typeMainMenuItemConfig, 'id' | 'name' | 'path' | 'allowPermissions'>[]
}

export type typeMainMenuItem = Omit<typeMainMenuItemConfig, 'allowPermissions'>

export type typeMainMenuItemProps = typeMainMenuItem
