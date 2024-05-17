import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(() => ({
    skeletonWrapper: {
        width: '100%',
        padding: rem(30),
        flexDirection: 'column',
        gap: rem(42),
    },
}));
