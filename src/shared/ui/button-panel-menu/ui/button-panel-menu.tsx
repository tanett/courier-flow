import { Menu, UnstyledButton } from '@mantine/core';
import { useStyles } from './styles';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { typeButtonMenuExtensions, typeButtonPanelMenu } from '../types/types';
import { MenuItem } from './menu-item';

// eslint-disable-next-line react/prop-types
const ButtonPanelMenu: typeButtonPanelMenu & typeButtonMenuExtensions = ({
    /* eslint-disable react/prop-types */
    children,
    sxForMainButton,
    trigger='click'
}) => {

    const { classes } = useStyles();

    return (
        <Menu shadow="md" width={ 200 } position="bottom-end" trigger={trigger}>
            <Menu.Target>
                <UnstyledButton className={ classes.menuButton } sx={ sxForMainButton || undefined }>
                    <EllipsisVerticalIcon className={ classes.menuButtonIcon }/>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                { children }
            </Menu.Dropdown>
        </Menu>

    );

};

ButtonPanelMenu.MenuItem = MenuItem;


export { ButtonPanelMenu };
