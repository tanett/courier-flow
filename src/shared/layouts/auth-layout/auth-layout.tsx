import React from 'react';
import { Outlet } from 'react-router-dom';
import { SuspenseProvider } from '../../providers/suspense-provider/suspense-provider';
import { useStyles } from './styles';
import { Box, Flex, rem, Space, Text } from '@mantine/core';
import { ReactComponent as Logo } from '../../../shared/images/logo/logo.svg';
import { AnimatedLayout } from 'shared/layouts/auth-layout/animatedLayout';
import { SelectStand } from 'features/select-stand/select-stand';


export const AuthLayout: React.FC = () => {

    const { classes } = useStyles();

    const title = process.env.REACT_APP_NAME || '';
    return (
        <Box className={classes.layout}>
            <AnimatedLayout>
                <Flex justify={'center'} p={25} w={'100%'}><SelectStand/></Flex>
                <Box className={classes.loginContainer}>

                    <Box className={classes.form}>

                        <Box className={classes.formContainer}>
                            {/* <Box pos={'relative'}> */}
                            {/*     <LanguageSelectorWelcome/> */}
                            {/* </Box> */}
                            <Box className={ classes.logoWrapper }>
                                {/* <Logo/> */}
                                <Text>{title}</Text>
                            </Box>

                            <Space h={ rem(24) }/>

                            <SuspenseProvider>
                                <Outlet/>
                            </SuspenseProvider>

                        </Box>

                    </Box>

                </Box>
            </AnimatedLayout>

        </Box>
    );

};
