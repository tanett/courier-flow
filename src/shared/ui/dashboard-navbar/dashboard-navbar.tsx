import { Navbar, ScrollArea } from '@mantine/core';
import React from 'react';
import { typeDashboardNavbarProps } from './types';
import { useStyles } from './styles';

export const DashboardNavbar: React.FC<typeDashboardNavbarProps> = ({ topBlock, children, bottomBlock }) => {

    const { classes } = useStyles();

    return (
        <Navbar width={{ base: 255 }} className={classes.navbarContainer}>
            {topBlock && <Navbar.Section>{topBlock}</Navbar.Section>}
            <Navbar.Section grow component={ScrollArea}>{children}</Navbar.Section>
            {bottomBlock && <Navbar.Section>{bottomBlock}</Navbar.Section>}
        </Navbar>
    );

};
