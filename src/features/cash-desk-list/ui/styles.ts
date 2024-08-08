import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    actionColumn: { width: rem(110) },
    dateColumn: {
        flexDirection: 'column',
        fontSize: rem(14),
        fontWeight: 400,
        color: theme.colors.gray[ 5 ],
    },
    dateOpened: {
        borderBottom: `1px solid ${theme.colors.gray[ 2 ]}`,
        paddingBottom: rem(2),
    },
    dateTitle: {
        fontSize: rem(14),
        color: theme.colors.gray[ 4 ],
    },
    dateDay: { color: theme.colors.gray[ 9 ], fontWeight: 500 },
    buttonPanelWrapper: {
        alignItems: 'center',
        gap: rem(24),
        justifyContent: 'center',
    },
    center: {
        justifyContent: 'center',
        width: '100%',
    },
    currencyBlock: { flexDirection: 'column' },
    currencyRow: { gap: rem(4) },
    currency: { fontWeight: 400 },
}));
