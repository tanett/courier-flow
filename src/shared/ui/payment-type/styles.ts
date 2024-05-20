import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
        iconContainer: {
            width: '16px',
            height: '16px',
            color: theme.colors.gray[5],
        },
        flexRow: {
            flexWrap: 'nowrap',
            gap: rem(6),
            alignItems: 'center',
            lineHeight: rem(20),
        },
    btnLink: {
        fontWeight: 500,
        fontSize: theme.fontSizes.md,
        '&.mantine-UnstyledButton-root': {
            padding: '0px 2px',
            minWidth: 'auto',
            height: '22px',
        },
    },

    })
);
