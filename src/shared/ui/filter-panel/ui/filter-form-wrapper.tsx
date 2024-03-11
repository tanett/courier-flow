import React from 'react';
import { Flex } from '@mantine/core';
import { useStyles } from './styles';

export const FilterFormWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.filterContainer}>
            {children}
        </Flex>
    );

};
