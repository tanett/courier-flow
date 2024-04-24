import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(() => ({
    wrapper: {
        alignItems: 'center',
        gap: rem(16),
    },
    icon: {
        width: rem(24),
        height: rem(24),
    },
}));
