import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    tableWrapper: {
        position: 'relative',
        flexDirection: 'column',
        gap: rem(24),
        overflowX: 'auto',
        scrollbarColor: theme.colors.gray[7],
        '&::-webkit-scrollbar': { height: '6px' },
        '&::-webkit-scrollbar-track': { backgroundColor: theme.fn.rgba(theme.colors.gray[3], 0.3), },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.colors.gray[3],
            borderRadius: rem(2),
        },
     //   width: `calc(100vw - 310px)`,
        paddingBottom: `4px`,
    },
    tableBorder: {
        borderRadius: rem(4),
        overflow: 'hidden',
        boxSizing: 'border-box',
        border: `1px solid ${ theme.colors.borderColor[0] }`,
        minWidth: 'fit-content',

        '> table': {
            minWidth: '100%',
            borderCollapse: 'collapse',
            backgroundColor: theme.white,
        },

        '& thead': { borderBottom: `1px solid ${ theme.colors.borderColor[0] }` },

        '& th, & td': { padding: `${ rem(9) } 0` },
        '& th > div, & td > div': { padding: `0 ${ rem(16) }` },
        '& tbody tr': { borderTop: `1px solid ${ theme.colors.borderColor[0] }` },
        '& tbody tr:hover': { backgroundColor: theme.colors.primary[0] },
        '& tbody tr.empty:hover': { backgroundColor: 'transparent' },
    },
    inTab: { borderRadius: `0 0 ${ rem(4) } ${ rem(4) }` },
}));
