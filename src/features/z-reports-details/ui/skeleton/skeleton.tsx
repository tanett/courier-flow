import React from 'react';
import { Flex, Skeleton } from '@mantine/core';
import { useStyles } from './styles';

export const ZReportDetailsSkeleton: React.FC = () => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.skeletonWrapper}>
            <Skeleton height={332} radius="xs" />
            <Skeleton height={176} radius="xs" />
        </Flex>
    );

};
