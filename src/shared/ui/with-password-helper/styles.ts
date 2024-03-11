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
        padding: theme.spacing.md,
        zIndex: 10,
    },
    rule: {
        display: 'flex',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    checked: { color: theme.colors.primary[ 5 ] },
    icon: {
        width: rem(24),
        height: rem(24),
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
    },
    text: { fontSize: theme.fontSizes.sm },
}));
