import React from 'react';
import { Flex, SimpleGrid, Skeleton } from '@mantine/core';


export const FormSkeleton: React.FC = () => {

    return (
        <Flex direction={'column'} gap={25} maw={1185}>
            <Skeleton height={ 80 } radius="xs"/>
            <SimpleGrid cols={ 2 }>
                <Skeleton height={ 80 } radius="xs"/>
                <div/>
            </SimpleGrid>
            <SimpleGrid cols={ 2 }>
                <Skeleton height={ 80 } radius="xs"/>
                <Skeleton height={ 80 } radius="xs"/>
            </SimpleGrid>
            <Skeleton height={80 } radius="xs"/>
            <Skeleton height={ 80 } radius="xs"/>
            <Skeleton height={ 160 } radius="xs"/>
            <SimpleGrid cols={4}>
                <div/><div/> <Skeleton height={ 40 } radius="xs"/> <Skeleton height={ 40 } radius="xs"/>
            </SimpleGrid>
        </Flex>
    );

};
