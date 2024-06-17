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
    listContainer: {
        maxHeight: rem(564),
        minHeight: rem(400),
        [`@media (max-width: ${rem(800)})`]: { minHeight: 'auto',},
        overflowY: 'auto',
        position: 'relative',
        width: 'calc(50% + 10px)',
        maxWidth: rem(543),
        minWidth: rem(350),
    },
    listItem: {
        paddingTop: '8px',
        paddingBottom: '8px',
        paddingLeft: '12px',
        paddingRight: '12px',
        marginBottom: '4px',
        marginRight: '10px',
        gap: '6px',
        position: 'relative',
        backgroundColor: theme.colors.gray[0],
        borderRadius: '2px',
        cursor: 'pointer',
        overflow: 'hidden',
        '&:hover': {  backgroundColor: theme.colors.gray[1], },
        '& .mantine-Text-root': { fontWeight: 500, },
        '&.selectedListItem': {
            backgroundColor: theme.colors.primary[0],
            paddingRight: '22px',
            marginRight: 0,

        }

    },
    chevronListItem: {
        width: rem(20),
        height: rem(20),
        color: theme.colors.gray[8],
        '&.selectedChevron':{transform: 'rotate(-90deg)'},
    },
    marker: {
        width: '8px',
        height: '8px',
        marginTop: '10px',
        borderRadius: '50%',
        marginRight: '2px',
        flexShrink: 0,
        backgroundColor: theme.colors.yellow[5],
        alignSelf: 'flex-start',

    },
    listItemProduct: {
        paddingTop: '0',
        paddingBottom: '0',
        paddingLeft: '8px',
        paddingRight: '8px',
        gap: '6px',
        position: 'relative',
        '& .mantine-Text-root': { wordBreak: 'break-all' },
        '&:hover': {  backgroundColor: theme.colors.gray[0], },
    },
}));
