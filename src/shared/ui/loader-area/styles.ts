import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    overlay: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.fn.rgba(theme.white, 0.6),
    },
}));
