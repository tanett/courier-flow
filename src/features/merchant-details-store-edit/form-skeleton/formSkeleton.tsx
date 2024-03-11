import React from 'react';
import { Flex, SimpleGrid, Skeleton } from '@mantine/core';


export const FormSkeleton: React.FC = () => {

    return (
        <Flex direction={'column'} gap={30} maw={1185}>
            <SimpleGrid cols={ 2 }>
                <Skeleton height={ 100 } radius="xs"/>
                <div/>
            </SimpleGrid>
            <SimpleGrid cols={ 2 }>
                <Skeleton height={ 100 } radius="xs"/>
                <Skeleton height={ 100 } radius="xs"/>
            </SimpleGrid>
            <SimpleGrid cols={4}>
                <div/><div/> <Skeleton height={ 40 } radius="xs"/> <Skeleton height={ 40 } radius="xs"/>
            </SimpleGrid>
        </Flex>
    );

};
