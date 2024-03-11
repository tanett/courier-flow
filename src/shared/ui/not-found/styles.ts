import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    layout: {
        minHeight: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wrapper: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    message: {
        fontSize: '4.5vw',
        fontWeight: 'bold',
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    icon: {
        width: '80%',
        height: 'auto',
        fill: theme.fn.rgba(theme.colors.primary[ 5 ], 0.3),
    },
}));
