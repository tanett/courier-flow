import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    dialogWrapper: {
        padding: `${rem(8)} ${rem(39)} ${rem(10)}`,
        flexDirection: 'column',
    },
    withoutPadding: { padding: 0 },
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
        backgroundColor: theme.colors.primary[ 5 ],
        '&:hover': { backgroundColor: theme.colors.primary[ 5 ] },
    },
    secondary: {
        borderColor: theme.colors.primary[ 5 ],
        color: theme.colors.primary[ 5 ],
        '&:hover': { backgroundColor: theme.colors.primary[ 0 ] },
    },
}));
