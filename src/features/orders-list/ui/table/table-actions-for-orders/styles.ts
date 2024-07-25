import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    actionsWrapper: {
        alignItems: 'center',
        '& .mantine-Tooltip-tooltip': {
            color: theme.black,
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
            fontSize: rem(14),
            padding: `${rem(12)} ${rem(16)}`,
            backgroundColor: theme.white,
        },

    },
    icon: { padding: `0 ${rem(8)}`, '& .mantine-ActionIcon-root[data-disabled]': {pointerEvents: 'auto',  cursor: 'not-allowed' }, },
    invisible: {visibility: 'hidden'},
    divider: { borderLeft: `1px solid ${theme.colors.borderColor[ 0 ]}` },
    primaryColor: { color: theme.colors.primary[ 4 ] },
    menuItem: {
        fontSize: theme.fontSizes.md,
        '&[data-hovered]': { backgroundColor: theme.colors.primary[ 0 ] },
        '&[disabled]': { backgroundColor: theme.colors.gray[ 1 ],pointerEvents: 'auto', cursor: 'not-allowed' },
    },
}));
