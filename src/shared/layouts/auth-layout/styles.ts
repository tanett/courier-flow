import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({

    layout: {
        height: '100vh',
        display: 'flex',
    },

    loginContainer: {
        padding: theme.spacing.lg,
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.lg,
        width: rem(524),
        [ theme.fn.smallerThan('md') ]: { width: '100%' },
        backgroundColor: theme.white,
        borderRadius: rem(10),
        paddingTop: rem(42),
        paddingLeft: rem(42),
        paddingRight: rem(42),
        paddingBottom: rem(42),
        filter: 'drop-shadow(0px 20px 60px rgba(55, 114, 255, 0.25))',
    },
    form: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: { width: '100%' },
    logoWrapper: {
        width: rem(210),
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .mantine-Text-root': {
            color: theme.colors.primary[ 5 ],
            fontSize: rem(28),
            fontWeight: 700,
            lineHeight: 'normal',
            marginTop: rem(8),
        },
    },
    bottom: {
        paddingTop: theme.spacing.xs,
        borderTop: `1px solid ${ theme.colors.gray[ 3 ] }`,
    },
}));
