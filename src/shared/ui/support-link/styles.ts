import { createStyles, em, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    text: {
        fontWeight: 600,
        fontSize: theme.fontSizes.md,
        color: theme.colors.gray[ 5 ],
        letterSpacing: em(0.3),
    },
    link: {
        color: theme.colors.primary[ 5 ],
        textDecoration: 'underline',
        textDecorationThickness: rem(1),
        textDecorationColor: 'transparent',
        textUnderlineOffset: rem(2),
        transitionProperty: 'all',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease',
        '&:hover': { textDecorationColor: theme.colors.primary[ 6 ], color: theme.colors.primary[ 6 ] },
    },
}));
