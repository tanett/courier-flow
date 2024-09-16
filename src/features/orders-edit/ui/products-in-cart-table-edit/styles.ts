import { createStyles, em, rem } from '@mantine/core';

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
       // [`@media (max-width: ${em(800)})`]: {  maxWidth: '672px',minWidth: '672px' },
        paddingTop: `28px`,

    },
    tableBorder: {
        borderRadius: rem(8),
        maxHeight: '430px',
         overflowY: 'auto',
        border: `1px solid ${ theme.colors.borderColor[0] }`,
      // minWidth: 'fit-content',

        padding: rem(2),
        position: 'relative',

        '> table': {
            minWidth: '100%',
            borderCollapse: 'collapse',
            backgroundColor: theme.white,
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,

        },

        '& thead': {
            borderTopRadius: rem(8),
           // borderBottom: `1px solid ${ theme.colors.borderColor[0] }`,
            position: 'sticky',
            top: rem(-3),
            backgroundColor: theme.white,
            boxShadow: `1px -22px 1px -22px ${theme.colors.borderColor[0]} inset`,
            zIndex: 99,
            '> tr': {
                borderTopRadius: rem(8),
                '>th:first-of-type > div':{  borderTopLeftRadius: rem(8)},
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
    inputWrapper: {
        '& .mantine-Input-input': {
            border: 'none',
            borderRadius: rem(6),
            backgroundColor: theme.colors.gray[1],
            height: rem(28),
            maxWidth: rem(70),
            minWidth: rem(36),
            width: 'fit-content',
            '&.mantine-Input-input':{ padding: '0 4px', textAlign: 'center' ,  minWidth: rem(36),  width: 'fit-content',},
        }
    },
    disabledInCart: {
        backgroundColor: theme.colors.gray[1],
        color: theme.colors.gray[4],
    }
}));
