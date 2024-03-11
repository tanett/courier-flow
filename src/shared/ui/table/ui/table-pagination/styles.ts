import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    paginationBlock: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(16),
        width: '100%',
    },
    paginationContainer: {
        flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'end',
        '& .mantine-Pagination-control': { borderColor: theme.colors.borderColor[ 0 ] },
        '& .mantine-Pagination-control[data-active]': {
            borderColor: theme.colors.primary[ 5 ],
            backgroundColor: theme.colors.primary[ 5 ],
        },
        '& .mantine-Pagination-control[aria-current="page"]:hover': { backgroundColor: theme.colors.primary[ 6 ] },
        '& .mantine-Pagination-control[disabled]': { color: '#8b5cf6' },
    },
    perPageContainer: {
        alignItems: 'center',
        gap: rem(10),
        fontSize: rem(14),

        '& .mantine-Select-item': { fontSize: rem(14) },

        '& input': { width: rem(65) },
    },
}));
