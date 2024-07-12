import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({

    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10px',
        alignItems: 'baseline',
    },
    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 500,
        letterSpacing: 0.3,
        paddingBottom: 0,
        paddingTop: 0,
    },

    dataContainer: {
        border: `1px solid ${ theme.colors.gray[3] }`,
        borderRadius: '4px',
        overflowX: 'hidden',
    },

    inputField: {
        '&.mantine-InputWrapper-root':{maxWidth:'none'},
        '& input': {
            borderColor: theme.colors.borderColor[0],
            paddingTop: rem(18),
            paddingBottom: rem(18),
            height: rem(44),
            '&::placeholder': {
                fontSize: theme.fontSizes.lg,
                color: theme.colors.gray[3],
                lineHeight: rem(20),
                letterSpacing: 0.3,
            },

        },
    },
    iconFind: {
        width: rem(20),
        height: rem(20),
        color: theme.black,
    },
    iconClose: {
        width: rem(20),
        height: rem(20),
        color: theme.black,
    },
    listContainer: {
        marginTop: rem(5),
        height: rem(450),
        overflowY: 'auto',

    },
    listItem: {
        padding: '8px',
        gap: '10px',
        position: 'relative',
        // '& .mantine-Text-root': { width: '90%' },
        '&:hover': {
            backgroundColor: theme.colors.gray[0],
            cursor: 'pointer',
        },
        '& .editButtonBlock': { display: 'none',  },
        '&:hover .editButtonBlock': { display: 'flex',  }
    },
    checkIconNotVisible: { display: 'none', },
    listItemDisabled: {
        backgroundColor: 'transparent',
        color: theme.colors.gray[3],

    },
    checkIconVisible: {

        display: 'block',
        width: '20px',
        height: '20px',

    },
    error: {
        color: theme.colors.red[5],
        fontSize: theme.fontSizes.sm,
        marginTop: '5px',
    },

}));
