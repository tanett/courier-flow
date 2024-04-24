import { Flex, Skeleton } from '@mantine/core';
import React from 'react';
import { useStyles } from '../../../shared/ui/export-files-list/ui/styles';

export const ImportListSkeleton: React.FC = () => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.wrapper}>
            <Skeleton height={46} radius="xs" />
            <Skeleton height={46} radius="xs" />
            <Skeleton height={46} radius="xs" />
            <Skeleton height={46} radius="xs" />
            <Skeleton height={46} radius="xs" />
            <Skeleton height={46} radius="xs" />
            <Skeleton height={46} radius="xs" />
            <Skeleton height={46} radius="xs" />
        </Flex>
    );

};
