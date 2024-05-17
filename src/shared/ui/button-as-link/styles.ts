import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    btnLink: {
        fontWeight: 500,
        color: theme.colors.primary[5],
        fontSize: theme.fontSizes.md,
        '&.mantine-UnstyledButton-root': {
            padding: '0px 2px',
            minWidth: 'auto',
            height: '22px',
        },
        '&:hover': {color: theme.colors.primary[7],}
    },

    })
);
