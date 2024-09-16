import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    menuWrapper: { flexDirection: 'row' },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(10),
        padding: `${ rem(16) } ${ rem(24) } ${ rem(16) } ${ rem(20) }`,
        textDecoration: 'none',
        color: theme.colors.gray[ 5 ],
        borderBottom: `${ rem(4) } solid transparent`,
        borderTop: `${ rem(4) } solid transparent`,
        transition: 'all ease-in 0.2s',

        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },

        '&.active': {
            backgroundColor: theme.colors.gray[ 0 ],
            fontWeight: 600,
            borderColor: theme.colors.primary[ 4 ],
            color: theme.colors.primary[ 5 ],
        },
    },
    accordion: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(10),
        color: theme.colors.gray[ 5 ],
        borderLeft: `${ rem(4) } solid transparent`,
        transition: 'all ease-in 0.2s',

        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },


    },
    linkInAccordion: {
        display: 'flex',
        alignItems: 'center',
        gap: rem(10),
        padding: `${ rem(16) } ${ rem(24) } ${ rem(16) } ${ rem(40) }`,
        textDecoration: 'none',
        color: theme.colors.gray[ 5 ],
        transition: 'all ease-in 0.2s',

        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },

        '&.active': {
            fontWeight: 600,
            color: theme.colors.primary[ 5 ],
            textDecoration: 'underline',
        },
    },
    activeAccordion: {
        backgroundColor: theme.colors.gray[ 0 ],
        fontWeight: 600,
        borderColor: theme.colors.primary[ 4 ],
        color: theme.colors.primary[ 5 ],
    },
    icon: {
        width: rem(24),
        height: rem(24),
    },
    skeletonWrapper: {
        padding: `0 ${ rem(theme.spacing.xs) }`,
        flexDirection: 'row',
        gap: theme.spacing.xs,
    },
}));
