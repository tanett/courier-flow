import React, { PropsWithChildren } from 'react';
import { SimpleGrid } from '@mantine/core';


export const GridWrapper: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <SimpleGrid
            breakpoints={ [
                {
                    minWidth: 'md',
                    cols: 1,
                    spacing: 8,
                },
                {
                    minWidth: 1200,
                    cols: 2,
                    spacing: 12,
                }
            ] }
        >
            { children }
        </SimpleGrid>
    );
};
