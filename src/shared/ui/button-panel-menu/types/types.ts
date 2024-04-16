import { MenuItem } from '../ui/menu-item';
import React from 'react';
import { Sx } from '@mantine/core';

export type typeButtonMenuExtensions = {
    MenuItem: typeof MenuItem
}

export type typeButtonPanelMenu = React.FC<React.PropsWithChildren<{ sxForMainButton?: Sx | (Sx | undefined)[], trigger?: 'hover' | 'click'}>>

export interface typeMenuItemProps {
    label: string
    icon?: React.ReactNode
    onClick: () => void
    primaryColor?: boolean
}
