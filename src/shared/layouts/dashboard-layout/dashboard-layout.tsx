import React from 'react';
import { Outlet } from 'react-router-dom';
import { SuspenseProvider } from '../../providers/suspense-provider/suspense-provider';
import { routerPaths } from 'app/config/router-paths';
import { AppShell, Box, Flex, ScrollArea } from '@mantine/core';
import { DashboardNavbar } from '../../ui/dashboard-navbar/dashboard-navbar';
import { useStyles } from './styles';
import { ReactComponent as Logo } from '../../images/logo/logo.svg';
import { ProfileButton } from '../../ui/profile-button/profile-button';
import { MainMenu } from '../../../features/main-menu';


export const DashboardLayout: React.FC = () => {

    const { classes } = useStyles();

    return (
        <AppShell
            navbar={<DashboardNavbar

                topBlock={<Flex className={classes.topWrapper}>
                    <Logo className={classes.logo}/>
                    {process.env.REACT_APP_NAME && <div className={classes.logoText}>{process.env.REACT_APP_NAME}</div>}
                </Flex>}

                bottomBlock={<Box className={classes.bottomWrapper}>
                    <ProfileButton link={routerPaths.profile}/>
                </Box>}
            >
                <MainMenu/>
            </DashboardNavbar>}
            padding={0}
            className={classes.dashboard}
        >
            <ScrollArea className={classes.scrollBox}>
                <SuspenseProvider>
                    <Outlet/>
                </SuspenseProvider>
            </ScrollArea>
        </AppShell>
    );

};
