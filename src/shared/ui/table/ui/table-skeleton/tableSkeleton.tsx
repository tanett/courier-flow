import React from 'react';
import { Flex, Skeleton } from '@mantine/core';
import { useStyles } from './styles';

export const TableSkeleton: React.FC = () => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.skeletonWrapper}>
            <Skeleton height={40} radius="xs" />
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.tableRow}>
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
                <Skeleton height={30} radius="xs" />
            </Flex>
            <Flex className={classes.pagination}>
                <Skeleton height={30} width={30} radius="xs" />
                <Skeleton height={30} width={30} radius="xs" />
                <Skeleton height={30} width={30} radius="xs" />
                <Skeleton height={30} width={30} radius="xs" />
                <Skeleton height={30} width={30} radius="xs" />
                <Skeleton height={30} width={30} radius="xs" />
                <Skeleton height={30} width={30} radius="xs" />
                <Skeleton height={30} width={30} radius="xs" />
            </Flex>
        </Flex>
    );

};
