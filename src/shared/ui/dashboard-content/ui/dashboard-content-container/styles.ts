import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles(() => ({
    dashboardContainer: {
        flexDirection: 'column',
        gap: rem(24),
        paddingLeft: rem(30),
        paddingRight: rem(30),
        paddingTop: rem(33),
        paddingBottom: rem(33),
    },

}));
