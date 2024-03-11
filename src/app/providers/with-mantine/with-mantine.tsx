import React from 'react';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme.config';


export const withMantine = (component: () => React.ReactNode) => () => {

    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
            {component()}
        </MantineProvider>
    );

};
