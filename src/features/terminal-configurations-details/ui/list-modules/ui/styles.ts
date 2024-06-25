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

    dataContainer: {
        border: `1px solid ${ theme.colors.gray[3] }`,
        borderRadius: '4px',
        overflowX: 'hidden',
        padding: '16px 8px ',
        height: '100%',
    },
    listContainer: {
        marginTop: rem(5),
        overflowY: 'auto',
        position: 'relative',
        maxHeight: rem(564),
        minHeight:rem(362),
        [`@media (max-width: ${rem(1200)})`]: { minHeight: 'fit-content', maxHeight: 'none'},
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

}));
