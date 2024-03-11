import React from 'react';
import { Flex } from '@mantine/core';
import { useStyles } from './styles';
import { Header } from '../header/header';
import { typeDashboardContent, typeDashboardContentExtensions } from '../../types/types';

// eslint-disable-next-line react/prop-types
const DashboardContent: React.FC<typeDashboardContent & React.PropsWithChildren> & typeDashboardContentExtensions = ({ withForm, children }) => {

    const { classes } = useStyles();

    return (
        <Flex className={ classes.dashboardContainer } maw={withForm ? 1185 : undefined}>
            { children }
        </Flex>
    );

};

DashboardContent.Header = Header;

export { DashboardContent };
