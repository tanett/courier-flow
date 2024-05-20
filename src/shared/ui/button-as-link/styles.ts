import { createStyles, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    btnLink: {
        fontWeight: 500,
        color: theme.colors.primary[5],
        fontSize: theme.fontSizes.md,
        '&.mantine-UnstyledButton-root': {
            padding: '0px 2px',
            minWidth: 'auto',
            height: 'auto',
            '&[data-disabled="true"]':{
                backgroundColor: 'transparent',
                color: theme.black,
                fontWeight: 400,
            },
        },
        '&:hover': {color: theme.colors.primary[7],},
        '& .mantine-Text-root': {whiteSpace: 'pre-wrap',   wordBreak: 'break-all',},
    },

    })
);
