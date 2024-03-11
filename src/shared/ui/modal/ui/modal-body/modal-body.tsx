import { Box } from '@mantine/core';
import React from 'react';

export const Body: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <Box>
            {children}
        </Box>
    );

};
