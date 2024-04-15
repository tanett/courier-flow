import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    closeButton: {
        width: rem(42),
        height: rem(42),
        borderColor: 'transparent',
        color: theme.colors.gray[5],
    },
    icon: {
        width: rem(28),
        height: rem(28),
    },
}));
