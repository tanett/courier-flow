import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    drawerContainer: {
        flexDirection: 'column',
        width: '100%',
        height: '100vh',

        '& form': {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: rem(42),
            padding: rem(30),
            paddingTop: rem(24),
        },
    },
    drawerHeader: {
        fontSize: rem(22),
        padding: rem(30),
        paddingBottom: rem(22),
        borderBottom: `1px solid ${theme.colors.borderColor[ 0 ]}`,
    },
    drawerTitle: {
        flexGrow: 1,
        color: theme.colors.primary[ 5 ],
        fontWeight: 600,
        letterSpacing: rem(0.3),
    },

    drawerContentWrapper: {
        flexGrow: 1,
        padding: `${rem(24)} ${rem(30)}`,
    },
}));
