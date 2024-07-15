import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({

    tableWrapper: {
        position: 'relative',
        flexDirection: 'column',
        gap: rem(24),
        // overflowX: 'auto',
        // scrollbarColor: theme.colors.gray[7],
        // '&::-webkit-scrollbar': { height: '6px' },
        // '&::-webkit-scrollbar-track': { backgroundColor: theme.fn.rgba(theme.colors.gray[3], 0.3), },
        // '&::-webkit-scrollbar-thumb': {
        //     backgroundColor: theme.colors.gray[3],
        //     borderRadius: rem(2),
        // },
        // width: `calc(100vw - 310px)`,
        paddingTop: `28px`,
    },
    tableBorder: {
        borderRadius: rem(8),
        // overflow: 'hidden',
        border: `1px solid ${ theme.colors.borderColor[0] }`,
        minWidth: 'fit-content',
        padding: rem(2),

        '> table': {
            minWidth: '100%',
            borderCollapse: 'collapse',
            backgroundColor: theme.white,
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,
        },

        '& thead': {
            borderTopRadius: rem(8),
            borderBottom: `1px solid ${ theme.colors.borderColor[0] }`,
            '> tr': {
                borderTopRadius: rem(8),
                '>th:first-child > div':{  borderTopLeftRadius: rem(8)},
                '>th > div':{ paddingTop:  rem(9),paddingBottom:  rem(9),'>div':{paddingLeft:  rem(9),paddingRight:  rem(9),} }
            }
        },

        // '& th, & td': { padding:  rem(9)  },
        '& tbody tr': {
            borderTop: `1px solid ${ theme.colors.borderColor[0] }`,
            '>td > div':{ padding:  rem(9)}
        },
        '& tbody tr:hover': { backgroundColor: theme.colors.primary[0] },
        '& tbody tr.empty:hover': { backgroundColor: 'transparent' },
    },
}));
