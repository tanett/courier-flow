import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    button: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(10),
        fontSize: theme.fontSizes.sm,
        fontWeight: 400,
        borderRadius: rem(4),
        padding: `${rem(6)} ${rem(10)} ${rem(6)} ${rem(8)}`,
        marginRight: rem(-10),
        '&:hover': { backgroundColor: theme.colors.primary[ 1 ] },
    },
    icon: {
        width: rem(24),
        height: rem(24),
        color: theme.colors.primary[ 5 ],
    },
    text: { color: theme.colors.gray[ 5 ] },
}));
