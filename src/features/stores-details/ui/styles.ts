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
    icon: {
        padding: `0 ${rem(8)}` ,
    '& .mantine-ActionIcon-root:hover,.mantine-ActionIcon-root[data-expanded] ': {backgroundColor: theme.colors.primary[ 1] },
    },
    divider: { borderLeft: `1px solid ${theme.colors.borderColor[ 0 ]}` },
    primaryColor: { color: theme.colors.primary[ 4 ] },
    menuActionsButton: { '&:hover':{backgroundColor: theme.colors.primary[ 0 ] }, },

    menuItem: {
        fontSize: theme.fontSizes.md,
        '&[data-hovered]': { backgroundColor: theme.colors.primary[ 0 ] },
        '&[disabled]': { backgroundColor: theme.colors.gray[ 1 ], cursor: 'not-allowed' },
    },
}));
