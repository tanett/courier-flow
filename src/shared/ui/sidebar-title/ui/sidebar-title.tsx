import React from 'react';
import { ActionIcon, Flex } from '@mantine/core';
import { typeSidebarTitleProps } from '../types/types';
import { useStyles } from './styles';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';

export const SidebarTitle: React.FC<typeSidebarTitleProps> = ({ children, titleAction }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.wrapper}>
            {titleAction && <ActionIcon onClick={titleAction} variant="transparent">
                <ArrowLongLeftIcon className={classes.icon}/>
            </ActionIcon>}
            {children}
        </Flex>
    );

};
