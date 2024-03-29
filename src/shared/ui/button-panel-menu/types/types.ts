import { MenuItem } from '../ui/menu-item';
import React from 'react';

export type typeButtonMenuExtensions = {
    MenuItem: typeof MenuItem
}

export type typeButtonPanelMenu = React.FC<React.PropsWithChildren>

export interface typeMenuItemProps {
    label: string
    icon: React.ReactNode
    onClick: () => void
    primaryColor?: boolean
}
