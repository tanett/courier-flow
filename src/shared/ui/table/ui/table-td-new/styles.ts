import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    tdContent: {
        display: 'flex',
        alignItems: 'center',
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,
    },
    alignCenter: { justifyContent: 'center' },
    alignRight: { justifyContent: 'end' },
}));
