import { Menu } from '@mantine/core';
import { useStyles } from './styles';
import React from 'react';
import { typeMenuItemProps } from '../types/types';
import cn from 'classnames';

export const MenuItem: React.FC<typeMenuItemProps> = ({ label, icon, onClick, primaryColor }) => {

    const { classes } = useStyles();

    return (
        <Menu.Item className={cn([classes.menuItem, (primaryColor && classes.menuItemPrimaryColor)])} icon={icon} onClick={onClick}>
            {label}
        </Menu.Item>
    );

};
