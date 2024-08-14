import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({

    tab: {
        '& .mantine-Tabs-tabsList': { border: 'none' },
        '& .mantine-Tabs-tab': {
            borderColor: theme.colors.gray[ 3 ],
            borderTopRightRadius: rem(4),
            borderTopLeftRadius: rem(4),
            marginRight: rem(4),
            fontSize: theme.fontSizes.md,
            lineHeight: rem(20),
            letterSpacing: 0.3,
            '&:hover': { color: theme.colors.primary[ 5 ] },
            '&[data-active=true]': {
                borderColor: theme.colors.borderColor[ 0 ],
                color: theme.colors.primary[ 5 ],
                fontWeight: 700,
                backgroundColor: theme.white,
                borderBottom: '1px solid transparent',
            },
        },
        '& .mantine-Tabs-panel': {

            // padding: '10px 16px',
            borderTop: `1px solid ${theme.colors.borderColor[ 0 ]}`,
            borderBottomLeftRadius: rem(8),
            borderBottomRightRadius: rem(8),
            borderTopRightRadius: rem(8),
            backgroundColor: theme.white,
        },

    },
    smallText: { fontSize: rem(14), color: theme.colors.gray[ 5 ] },
    tinyText: { fontWeight: 400 },
    currencyBlock: { flexDirection: 'column' },
    currencyRow: { gap: rem(4) },
    currency: { fontWeight: 400 },
    tableTimeContainer: { display: 'flex', gap: rem(4) },
    negativeSign: { color: theme.colors.red[ 6 ] },
    positiveSign: { color: theme.colors.green[ 6 ] },
    skeletonContainer: {
        borderBottom: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        borderLeft: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        borderRight: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        borderRadius: `0 0 ${rem(8)} ${rem(8)}`,
        padding: rem(16),
    },
}));
