import React, { useState } from 'react';
import { useStyles } from './styles';
import { NavLink, useLocation } from 'react-router-dom';
import { Accordion, Box, Flex } from '@mantine/core';
import { typeMainMenuItemProps } from '../types/types';
import cn from 'classnames';


export const MainMenuItem: React.FC<typeMainMenuItemProps> = ({
    id,
    name,
    path,
    icon,
    activeIcon,
    children,
}) => {

    const { classes } = useStyles();

    const location = useLocation();

    const containsString = location.pathname.includes(path);
    const [ value, setValue ] = useState<string | null>(null);

    return (
        children ?
            <Accordion value={value} onChange={setValue}>
                <Accordion.Item value={id} sx={{ borderBottom: 'none' }}>
                    <Accordion.Control className={cn(classes.accordion, containsString ? classes.activeAccordion : '') }>
                        <Flex gap={10} >
                            <Box className={ classes.icon }>
                                { containsString
                                    ? activeIcon
                                    : icon
                                }
                            </Box>
                            <span> { name }  </span>
                        </Flex>


                    </Accordion.Control>
                    <Accordion.Panel>
                        { children.map(child => <NavLink
                            key={child.id}
                            to={ child.path }
                            className={ classes.linkInAccordion}
                        >
                            <span>
                                { child.name }
                            </span>
                        </NavLink>) }
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            : <NavLink
                to={ path }
                className={ classes.link }
            >
                <Box className={ classes.icon }>
                    { containsString
                        ? activeIcon
                        : icon
                    }
                </Box>
                <span>
                    { name }
                </span>
            </NavLink>
    );

};
