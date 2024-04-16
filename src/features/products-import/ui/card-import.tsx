import React from 'react';
import { Box, rem, Text, useMantineTheme } from '@mantine/core';

export const CardImport: React.FC<{ icon: React.ReactNode, label: string, description: string, onClick: () => void }> = ({
    icon,
    description,
    label,
    onClick
}) => {

    const theme = useMantineTheme();

    return (

        <Box
            onClick={ onClick }
            sx={ {
                padding: '28px 24px',
                border: `1px solid ${ theme.colors.borderColor[0] }`,
                borderRadius: '4px',
                width: '262px',
                //height: '196px',
                backgroundColor: theme.colors.gray[0],
                '&:hover': { backgroundColor: theme.colors.primary[0] },
                cursor: 'pointer'
            } }>
            <Box sx={ {
                width: '42px',
                height: '42px',
                color: theme.colors.green[5],
                margin: '0 auto',
                '& svg': { strokeWidth: 0.9 }
            } }>{ icon }</Box>
            <Text sx={ {
                color: theme.colors.primary[5],
                textAlign: 'center',
                fontSize: rem(16),
                fontWeight: 600,
                letterSpacing: 0.3,
                marginTop: rem(8),
                marginBottom: rem(4)
            } }>{ label }</Text>
            <Text sx={ {
                color: theme.colors.gray[5],
                textAlign: 'center',
                fontSize: rem(14),
                fontWeight: 400,
                letterSpacing: 0.3,
            } }>{ description }</Text>
        </Box>

    );

};
