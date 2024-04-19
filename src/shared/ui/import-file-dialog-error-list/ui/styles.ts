import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    errorListWrapper: {
        flexDirection: 'column',
        gap: rem(12),
        marginTop: rem(16),
    },
    rowWrapper: {
        gap: rem(4),
        fontSize: rem(14),
    },
    contentWrapper: {
        flexDirection: 'column',
        gap: `${rem(2)} ${rem(8)}`,
    },
    bigFont: { fontSize: rem(16) },
    bottomRow: {
        gap: rem(4),
        flexWrap: 'wrap',
    },
    bottomRowDataBlock: { gap: rem(4) },
    bottomRowTitle: {
        color: theme.colors.gray[ 4 ],
        fontSize: rem(14),
    },
}));
