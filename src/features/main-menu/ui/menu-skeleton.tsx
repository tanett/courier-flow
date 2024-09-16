import React from 'react';
import { Flex, Skeleton } from '@mantine/core';
import { useStyles } from './styles';

export const MenuSkeleton: React.FC = () => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.skeletonWrapper}>
            <Skeleton height={40} radius="xs" />
            <Skeleton height={40} radius="xs" />
            <Skeleton height={40} radius="xs" />
        </Flex>
    );

};
