import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    contentWrapper: {
        flexDirection: 'column',
        gap: rem(16),
    },
    fourColumn: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: rem(30),
    },
    twoColumns: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: rem(30),
    },
    oneColumnContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: rem(22),
    },
    colSpan: { gridColumn: 'span 2'},
    link: {
        transition: 'all ease-in 200ms',
        textDecoration: 'underline',
        textDecorationThickness: '1px',
        color: theme.colors.primary[ 5 ],
        textUnderlineOffset: 2,
        textDecorationColor: 'transparent',

        '&:hover': { textDecorationColor: theme.colors.primary[ 5 ] },
    },
    smallText: {fontSize: rem(14),}
}));
