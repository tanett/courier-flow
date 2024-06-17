import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({

    flexColumn: {
        flexDirection: 'column',
        gap: theme.spacing.md,
    },
    fieldset: {
        padding: '0',
        border: 'none',
        flexDirection: 'column',
        gap: rem(8),
        '& .mantine-Title-root': {
            color: theme.colors.primary[ 5 ],
            fontSize: theme.fontSizes.lg,
            fontWeight: 500,
            lineHeight: '150%',
        },
    },
    formGrid: { gap: `${theme.spacing.md} ${theme.spacing.xl}` },
    buttonsBar: {
        gap: theme.spacing.xl,
        justifyContent: 'end',
        '& .mantine-Button-root': {
            minWidth: rem(165),
            fontSize: theme.fontSizes.md,
            fontWeight: 700,
        },
    },
    icon: {
        width: rem(20),
        height: rem(20),
    },
    tab: {
        flexGrow: 1,
        '& .mantine-Tabs-tabsList': { border: 'none' },
        '& .mantine-Tabs-tab': {
            borderColor: theme.colors.gray[ 3 ],
            borderTopRightRadius: rem(4),
            borderTopLeftRadius: rem(4),
            marginRight: rem(4),
            fontSize: theme.fontSizes.md,
            lineHeight: rem(20),
            '&:hover': { color: theme.colors.primary[ 5 ] },
            '&[data-active=true]': {
                borderColor: theme.colors.borderColor[ 0 ],
                color: theme.colors.primary[ 5 ],
                fontWeight: 600,
                backgroundColor: theme.white,
                borderBottom: '1px solid transparent',
            },
        },
        '& .mantine-Tabs-panel': {
            border: `1px solid ${theme.colors.borderColor[ 0 ]}`,
            borderBottomLeftRadius: rem(8),
            borderBottomRightRadius: rem(8),
            borderTopRightRadius: rem(8),
            backgroundColor: theme.white,
            minHeight: '440px',
            maxHeight: '70vh',
        },

    },
}));
