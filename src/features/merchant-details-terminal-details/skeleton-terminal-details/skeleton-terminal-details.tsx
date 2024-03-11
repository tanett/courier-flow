import React from 'react';
import { Flex, SimpleGrid, Skeleton } from '@mantine/core';


export const SkeletonTerminalDetails: React.FC = () => {

    return (
        <Flex direction={'column'} gap={20} maw={1185}>
            <SimpleGrid cols={ 2 }>
                <Skeleton height={ 60 } radius="xs"/>
                <Skeleton height={ 60 } radius="xs"/>
                <Skeleton height={ 60 } radius="xs"/>
                <Skeleton height={ 60 } radius="xs"/>
            </SimpleGrid>
            <Skeleton height={60 } radius="xs"/>
            <Skeleton height={ 60 } radius="xs"/>
            <Skeleton height={ 60 } radius="xs"/>
            <SimpleGrid cols={4}>
                <div/><div/> <Skeleton height={ 40 } radius="xs"/> <Skeleton height={ 40 } radius="xs"/>
            </SimpleGrid>
        </Flex>
    );

};
