import React from 'react';
import { Flex, SimpleGrid, Skeleton } from '@mantine/core';
import { useStyles } from './styles';

export const FilterSkeleton: React.FC = () => {

    const { classes } = useStyles();

    return (
        <Flex className={classes.skeletonWrapper}>
            <Skeleton height={40} radius="xs" />
            <Flex justify="end" gap={24}>
                <Skeleton height={40} width={165} radius="xs" />
                <Skeleton height={40} width={165} radius="xs" />
                <Skeleton height={40} width={165} radius="xs" />
                <Skeleton height={40} width={165} radius="xs" />
                <SimpleGrid cols={2}>
                    <Skeleton height={40} width={165} radius="xs" />
                    <Skeleton height={40} width={165} radius="xs" />
                    <Skeleton height={40} width={165} radius="xs" />
                    <Skeleton height={40} width={165} radius="xs" />
                </SimpleGrid>
            </Flex>
        </Flex>
    );

};
