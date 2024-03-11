import React from 'react';
import { Flex, SimpleGrid, Skeleton } from '@mantine/core';

const SkeletonStoresDetailsPage: React.FC = () => (
    <Flex direction={ 'column' } gap={ 30 }>
        <SimpleGrid cols={ 2 }>
            <Skeleton height={ 60 } radius="xs"/>
            <div/>
        </SimpleGrid>

    </Flex>
);

export default SkeletonStoresDetailsPage;
