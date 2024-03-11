import { createStyles, rem } from '@mantine/core';

// TODO: make .active

export const useStyles = createStyles((theme) => ({
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(8),
        padding: `${rem(8)} ${rem(24)} ${rem(16)} ${rem(16)}`,
        textDecoration: 'none',
        color: theme.colors.primary[ 5 ],
        borderLeft: `${rem(4)} solid transparent`,
        transition: 'all ease-in 0.2s',

        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },

        '&.active': {
            backgroundColor: theme.colors.gray[ 0 ],
            fontWeight: 600,
            borderColor: theme.colors.primary[ 5 ],
        },
    },
    iconWrapper: {
        width: rem(32),
        height: rem(32),
        backgroundColor: theme.colors.primary[ 0 ],
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
    },
    icon: {
        width: rem(24),
        height: rem(24),
    },
}));
