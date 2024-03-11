import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    popup: { '& .mantine-Modal-content': { marginTop: `calc(140px - 5dvh)` } },
    popupContentWrapper: {
        padding: `${rem(32)} ${rem(69)} ${rem(42)}`,
        width: rem(504),
        flexDirection: 'column',
    },
    iconWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        height: rem(112),
    },
    iconAttention: { width: rem(112) },
    contentWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: rem(20),
        marginTop: rem(3),
    },
    buttonWrapper: {
        marginTop: rem(30),
        alignItems: 'center',
        gap: rem(24),
    },
    button: {},
    primary: {
        backgroundColor: theme.colors.primary[ 4 ],
        '&:hover': { backgroundColor: theme.colors.primary[ 5 ] },
    },
    secondary: {
        borderColor: theme.colors.primary[ 4 ],
        color: theme.colors.primary[ 4 ],
        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
    },
}));
