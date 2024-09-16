import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    dashboard: { backgroundColor: theme.colors.gray[ 0 ] },
    scrollBox: { height: '100vh' },
    topWrapper: {
        gap: rem(30),
        paddingLeft: rem(26),
        paddingRight: rem(26),

        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logo: { width: rem(42) },
    logoText: {
        fontSize: rem(22),
        fontWeight: 700,
        letterSpacing: rem(0.3),
        color: theme.colors.primary[ 5 ],
    },
    bottomWrapper: { paddingBottom: rem(0) },

    button: {
        backgroundColor: theme.colors.primary[ 5 ],
        fontWeight: 700,
        fontSize: theme.fontSizes.md,
        letterSpacing: '0.3px',
        '&:hover': { backgroundColor: theme.colors.primary[ 6 ] },
    },
}));
