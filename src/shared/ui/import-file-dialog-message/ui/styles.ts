import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles(() => ({
    messageContainerWrapper: {
        width: rem(516),
        boxSizing: 'border-box',
        flexDirection: 'column',
        gap: rem(24),
        marginBottom: rem(22),
    },
    wideVariant: { width: rem(548) },
    contentWrapper: {
        flexDirection: 'column',
        gap: rem(2),
        fontSize: rem(16),
    },
    contentTitle: {
        textAlign: 'center',
        fontSize: rem(20),
        fontWeight: 500,
        marginTop: rem(18),
    },
}));
