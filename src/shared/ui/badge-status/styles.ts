import { createStyles, em, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    badge: {
        '&.mantine-Badge-root': {
            textTransform: 'none',
            paddingLeft: rem(8),
            paddingRight: rem(8),
            paddingTop: rem(1),
            paddingBottom: rem(1),
            fontSize: theme.fontSizes.sm,
            fontWeight: 500,
            lineHeight: em(20),
        },
    },
}));
