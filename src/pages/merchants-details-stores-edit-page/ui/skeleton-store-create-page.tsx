import React from 'react';
import { Flex, SimpleGrid, Skeleton } from '@mantine/core';

const SkeletonStoreCreatePage: React.FC = () => (
    <Flex direction={ 'column' } gap={ 40 } maw={ 1185 }>
        <SimpleGrid cols={ 2 }>
            <Skeleton height={ 40 } radius="xs"/>
            <div/>
        </SimpleGrid>
        <SimpleGrid cols={ 2 }>
            <Skeleton height={ 40 } radius="xs" mb={ 10 }/>

            <div/>
            <Skeleton height={ 40 } radius="xs"/>
            <Skeleton height={ 40 } radius="xs"/>

        </SimpleGrid>
        <SimpleGrid cols={ 4 } >
            <div/>
            <div/>
            <Skeleton height={ 40 } radius="xs"/> <Skeleton height={ 40 } radius="xs"/>
        </SimpleGrid>
    </Flex>
);

export default SkeletonStoreCreatePage;
