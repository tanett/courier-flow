import { Flex } from '@mantine/core';
import { NotFound } from './not-found';
import React from 'react';
import { useStyles } from './styles';

export const NotFoundLayout: React.FC = () => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.layout}>
            <NotFound/>
        </Flex>
    );

};
