import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    container: {
        flexDirection: 'column',
        paddingBottom: '8px',
        paddingLeft: '15px',
        paddingRight: '15px',
    },
    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10px',
        alignItems: 'end',
        marginBottom: rem(2),
    },
    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 500,
        letterSpacing: 0.3,
        paddingBottom: 0,
        paddingTop: 0,
    },
    btnLink: {
        fontWeight: 400,
        fontSize: theme.fontSizes.sm,
        '&.mantine-UnstyledButton-root': {
            padding: '0px 2px',
            minWidth: 'auto',
            height: '22px',
        },
    },
    dataContainer: {
        border: `1px solid ${ theme.colors.gray[ 3 ] }`,
        borderRadius: '4px',
        padding: '16px',
    },
    inputField: {
        '& input': {
            borderColor: theme.colors.borderColor[ 0 ],
            paddingTop: rem(18),
            paddingBottom: rem(18),
            height: rem(44),
            '&::placeholder': {
                fontSize: theme.fontSizes.lg,
                color: theme.colors.gray[ 3 ],
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
        height: rem(250),
        overflowY: 'auto',
        width: rem(660),

    },
    listItem: {
        padding: '8px',
        gap: '10px',
        position: 'relative',
        '& .mantine-Text-root': { width: '90%' },
        '&:hover': {
            backgroundColor: theme.colors.gray[ 0 ],
            cursor: 'pointer',
        },
        '& svg': { display: 'none' },
    },
    listItemChecked: {
        backgroundColor: theme.colors.primary[ 0 ],
        color: theme.colors.primary[ 5 ],
        '& svg': {
            display: 'block',
            width: '24px',
            height: '24px',
        },
    },
    error: {
        color: theme.colors.red[ 5 ],
        fontSize: theme.fontSizes.sm,
        marginTop: '5px',
    },
    btnPanel: {
        display: 'flex',
        flexDirection: 'row',
        gap: '24px',
        justifyContent: 'center',
    },
    button: {
        fontWeight: 700,
        fontSize: theme.fontSizes.md,
        letterSpacing: 0.3,
        '& .mantine-Button-leftIcon': {
            width: '24px',
            height: '24px',
            color: theme.colors.primary[ 5 ],
        },
    },
}));
