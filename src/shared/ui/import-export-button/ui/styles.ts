import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    justIcon: {
        width: rem(42),
        height: rem(42),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: 'transparent',
        transition: 'background-color 200ms ease-in',
    },
    button: { '&:active': { transform: 'translateY(1px)' } },
    spin: {
        transform: 'rotate(0deg)',
        animation: 'spin 1s linear infinite',
    },
    icon: {
        width: rem(24),
        height: rem(24),
    },
    errorColor: { color: theme.colors.red[ 6 ] },
    errorHover: { '&:hover': { backgroundColor: theme.colors.red[ 1 ] } },
    doneColor: { color: theme.colors.green[ 6 ] },
    doneHover: { '&:hover': { backgroundColor: theme.colors.green[ 1 ] } },
    successColor: { color: theme.colors.green[ 6 ] },
    successHover: { '&:hover': { backgroundColor: theme.colors.green[ 1 ] } },
    loadingFileLinkIcon: {
        height: rem(16),
        width: rem(16),
        animation: 'spin 1s linear infinite',
        '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
    },
}));
