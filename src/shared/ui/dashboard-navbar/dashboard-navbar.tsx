import { Modal, Navbar, ScrollArea } from '@mantine/core';
import React from 'react';
import { typeDashboardNavbarProps } from './types';
import { useStyles } from './styles';
import Header = Modal.Header;

export const DashboardNavbar: React.FC<typeDashboardNavbarProps> = ({ topBlock, children, bottomBlock }) => {

    const { classes } = useStyles();

    return (

            <Navbar  className={classes.navbarContainer}>
                {topBlock && <Navbar.Section>{topBlock}</Navbar.Section>}
                <Navbar.Section grow>{children}</Navbar.Section>
                {bottomBlock && <Navbar.Section>{bottomBlock}</Navbar.Section>}
            </Navbar>


    );

};
