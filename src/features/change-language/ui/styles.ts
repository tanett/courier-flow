import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    flexWrapper: {
        position: 'absolute',
        top: 6,
        right: 0,
    },
    image: {
        border: `6px solid transparent`,
        borderRadius: rem(4),
        '&:hover': { borderColor: `rgba(233, 239, 255, 1)` },
    },
    actionIcon: {
        width: rem(48),
        height: rem(36),
        padding: `3px 5px`,
        borderRadius: rem(4),
        border: `1px solid transparent`,
        '&:focus': { border: `1px solid ${theme.colors.primary[ 5 ]}` },
        '&:active': {
            border: `1px solid ${theme.colors.primary[ 5 ]}`,
            boxShadow: `0 0 0 5px rgba(219, 234, 254, 1)`,
        },
    },
    selected: { border: `1px solid ${theme.colors.borderColor[ 0 ]}` },
    active: {
        border: `1px solid ${theme.colors.primary[ 5 ]}`,
        boxShadow: `0 0 0 5px rgba(219, 234, 254, 1)`,
        '&:focus, &:active': { border: `1px solid ${theme.colors.primary[ 5 ]}` },
    },
    dropDown: {
        borderRadius: rem(4),
        boxShadow: `0px 6px 15px 0px #322B2B1A`,

    },
}));
