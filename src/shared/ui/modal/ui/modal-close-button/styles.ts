import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(() => ({
    closeButton: {
        width: rem(42),
        height: rem(42),
        cursor: 'pointer'
    },
    icon: {
        width: rem(28),
        height: rem(28),
        cursor: 'pointer'
    },
}));
