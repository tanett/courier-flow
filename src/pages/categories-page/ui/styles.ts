import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    button: {
        backgroundColor: theme.colors.primary[ 5 ],
        fontWeight: 700,
        fontSize: theme.fontSizes.md,
        letterSpacing: '0.3px',
        '&:hover': { backgroundColor: theme.colors.primary[ 6 ] },
    },
}));
