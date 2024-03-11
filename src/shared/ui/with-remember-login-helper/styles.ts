import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: { position: 'relative' },
    helperWrapper: {
        position: 'relative',
        width: '100%',
        height: 0,
    },
    helper: {
        marginTop: theme.spacing.xs,
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: rem(6),
        background: theme.white,
        borderRadius: theme.radius.sm,
        boxShadow: theme.shadows.sm,
        padding: theme.spacing.xs,
        zIndex: 10,
    },
    button: {
        border: 'none',
        backgroundColor: 'transparent',
        fontFamily: theme.fontFamily,
        textAlign: 'start',
        cursor: 'pointer',
        transition: 'all ease-in 0.1s',
        padding: rem(8),
        borderRadius: rem(4),
        '&:hover': {
            backgroundColor: theme.colors.primary[ 2 ],
            color: theme.colors.primary[ 5 ],
        },
    },
}));
