import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    img: {
        width: rem(60),
        height: rem(60),
        objectFit: 'contain',
    },
    title: {
        fontSize: theme.fontSizes.md,
        letterSpacing: 0.3,
        lineHeight: rem(19),
        textAlign: 'center',
    },
    wrapper: {
        borderBottom: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        borderLeft: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        borderRight: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        borderBottomRightRadius: rem(8),
        borderBottomLeftRadius: rem(8),
        paddingBottom: rem(24),
        paddingTop: rem(10),
    },
}));
