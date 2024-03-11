import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    tableWrapper: {
        position: 'relative',
        flexDirection: 'column',
        gap: rem(24),
    },
    tableBorder: {
        borderRadius: rem(4),
        overflow: 'hidden',
        border: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        minWidth: '100%',

        '> table': {
            minWidth: '100%',
            borderCollapse: 'collapse',
            backgroundColor: theme.white,
        },

        '& thead': { borderBottom: `1px solid ${theme.colors.borderColor[ 0 ]}` },

        '& th, & td': { padding: `${rem(9)} 0` },
        '& th > div, & td > div': { padding: `0 ${rem(16)}` },
        '& tbody tr': { borderTop: `1px solid ${theme.colors.borderColor[ 0 ]}` },
        '& tbody tr:hover': { backgroundColor: theme.colors.primary[ 0 ] },
        '& tbody tr.empty:hover': { backgroundColor: 'transparent' },
    },
    inTab: { borderRadius: `0 0 ${rem(4)} ${rem(4)}` },
}));
