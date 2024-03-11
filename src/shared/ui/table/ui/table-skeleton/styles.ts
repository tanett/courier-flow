import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    skeletonWrapper: {
        flexDirection: 'column',
        gap: theme.spacing.xs,
    },
    tableRow: {
        alignItems: 'center',
        gap: theme.spacing.sm,
    },
    pagination: {
        alignItems: 'center',
        justifyContent: 'end',
        gap: theme.spacing.sm,
    },
}));
