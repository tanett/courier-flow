import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    templateLink: {
        display: 'flex',
        alignItems: 'center',
        fontSize: rem(14),
        gap: rem(4),
        alignSelf: 'end',
        color: theme.colors.primary[ 5 ],
        textDecoration: 'none',
        marginBottom: rem(12),

        '&:hover': { textDecoration: 'underline' },
    },
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
