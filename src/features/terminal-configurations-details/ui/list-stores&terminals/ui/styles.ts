import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({

    headerWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10px',
        alignItems: 'baseline',
        paddingLeft: '8px',
    },
    title: {
        fontSize: theme.fontSizes.lg,
        fontWeight: 500,
        letterSpacing: 0.3,
        paddingBottom: 0,
        paddingTop: 0,
    },
    btnLink: {
        fontWeight: 500,
        fontSize: theme.fontSizes.sm,
        lineHeight: '20px',
        marginRight: rem(4),
        paddingTop: 0,
        paddingBottom: 0,
        letterSpacing: 0.3,
        color: theme.colors.gray[5],
        '& .mantine-UnstyledButton-root, .mantine-Button-root': {
            paddingTop: '0',
            paddingBottom: '0',
            paddingLeft: '0',
            paddingRight: '0',
            minWidth: 'auto',
            height: '22px',
        },
    },
    dataContainer: {
        border: `1px solid ${ theme.colors.gray[3] }`,
        borderRadius: '4px',
        overflowX: 'hidden',
        padding: '16px 8px ',
    },
    listContainer: {
        marginTop: rem(5),
        maxHeight: rem(564),
        minHeight:rem(362),
        [`@media (max-width: ${rem(1200)})`]: { minHeight: 'fit-content', maxHeight: 'none'},
        overflowY: 'auto',
        position: 'relative',
    },
    listItem: {
        paddingTop: '0',
        paddingBottom: '0',
        paddingLeft: '8px',
        paddingRight: '8px',
        gap: '6px',
        position: 'relative',
        '& .mantine-Text-root': { width: '90%' },
        '&:hover': {  backgroundColor: theme.colors.gray[0], },
    },
    marker: {
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        backgroundColor: theme.colors.yellow[5],

    },
    error: {
        color: theme.colors.red[5],
        fontSize: theme.fontSizes.sm,
        marginTop: '5px',
    },

}));
