import React from 'react';
import { Outlet } from 'react-router-dom';
import { SuspenseProvider } from '../../providers/suspense-provider/suspense-provider';
import { routerPaths } from 'app/config/router-paths';
import { AppShell, Box, Flex, Header, ScrollArea } from '@mantine/core';
import { DashboardNavbar } from '../../ui/dashboard-navbar/dashboard-navbar';
import { useStyles } from './styles';
import { ReactComponent as Logo } from '../../images/logo/logo.svg';
import { ProfileButton } from '../../ui/profile-button/profile-button';
import { MainMenu } from '../../../features/main-menu/ui/main-menu';
import ErrorBoundary from 'shared/error-boundary/ErrorBoundary';


export const DashboardLayout: React.FC = () => {

    const { classes } = useStyles();

    return (
        <AppShell
            header={
                <Header height={ 80} pt={6}>
                    <Flex className={ classes.topWrapper }>
                        <>
                            <Logo className={ classes.logo }/>
                            { process.env.REACT_APP_NAME && <div className={ classes.logoText }>{ 'Courier' }</div> }
                        </>
                        <Box sx={{flexGrow: 1}}>
                            <ErrorBoundary>
                                <MainMenu/>
                            </ErrorBoundary>
                        </Box>

                        <Box className={ classes.bottomWrapper }>
                            <ProfileButton link={ routerPaths.profile }/>
                        </Box>
                    </Flex>

                </Header>
            }

            padding={ 0 }
            className={ classes.dashboard }
        >
            <ErrorBoundary>
                <ScrollArea className={ classes.scrollBox }>
                    <SuspenseProvider>
                        <Outlet/>
                    </SuspenseProvider>
                </ScrollArea>
            </ErrorBoundary>
        </AppShell>
    );

};
