import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    menuButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: rem(36),
        boxSizing: 'border-box',
        color: theme.colors.gray[ 5 ],
        border: `1px solid${theme.colors.gray[ 5 ]}`,
        borderRadius: rem(4),

        '&:active': { transform: 'translateY(1px)' },
    },
    menuButtonIcon: {
        width: rem(20),
        height: rem(20),
    },
    menuItem: {
        fontSize: rem(14),
        color: theme.colors.gray[ 6 ],
    },
    menuItemPrimaryColor: { color: theme.colors.primary[ 5 ]}
}));
