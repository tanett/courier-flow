import React from 'react';
import { Box, SimpleGrid, Skeleton } from '@mantine/core';

export const SkeletonStoreDetails: React.FC = () => {

    return (
        <SimpleGrid
            sx={ {
                borderRadius: '8px',
                padding: '10px 16px',
                marginTop: '-1px',
            } }
            breakpoints={ [
                {
                    minWidth: 'md',
                    cols: 1,
                    spacing: 10,
                },
                {
                    minWidth: 1200,
                    cols: 2,
                    spacing: 60,
                }
            ] }>
            <Skeleton height={ 80 } radius="xs"/>
            <SimpleGrid
                breakpoints={ [
                    {
                        minWidth: 'md',
                        cols: 1,
                        spacing: 10,
                    },
                    {
                        minWidth: 1200,
                        cols: 2,
                        spacing: 60,
                    }
                ] }>
                <Skeleton height={ 80 } radius="xs"/>
                <Skeleton height={ 80 } radius="xs"/>
            </SimpleGrid>
            <Skeleton height={ 200 } radius="xs"/>
            <Box>
                <Skeleton height={ 80 } radius="xs"/>
                <Skeleton height={ 80 } radius="xs"/>

            </Box>

        </SimpleGrid>
    );

};
