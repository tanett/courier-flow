import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({

    tab: {
position: 'relative',
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
                backgroundColor: theme.white,
                fontWeight: 700,
                borderBottom: '1px solid transparent',
            },
        },
        '& .mantine-Tabs-panel': {

            // padding: '10px 16px',
            borderTop: `1px solid ${theme.colors.borderColor[ 0 ]}`,
            borderBottomLeftRadius: rem(8),
            borderBottomRightRadius: rem(8),
            borderTopRightRadius: rem(8),
        },

    },
    tabsButtonsBlock: {
        position:'absolute',
        top: 0,
        right: 0
    },
}));
