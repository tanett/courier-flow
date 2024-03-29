import { Menu, UnstyledButton } from '@mantine/core';
import { useStyles } from './styles';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { typeButtonMenuExtensions, typeButtonPanelMenu } from '../types/types';
import { MenuItem } from './menu-item';

// eslint-disable-next-line react/prop-types
const ButtonPanelMenu: typeButtonPanelMenu & typeButtonMenuExtensions = ({ children }) => {

    const { classes } = useStyles();

    return (
        <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
                <UnstyledButton className={classes.menuButton}>
                    <EllipsisVerticalIcon className={classes.menuButtonIcon}/>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
                {children}
            </Menu.Dropdown>
        </Menu>

    );

};

ButtonPanelMenu.MenuItem = MenuItem;


export { ButtonPanelMenu };
