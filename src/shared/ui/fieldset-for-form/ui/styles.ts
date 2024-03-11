import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    fieldset: {
        padding: '0',
        margin: 0,
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: rem(16),
        '& .mantine-Title-root': {
            color: theme.colors.primary[ 5 ],
            fontSize: theme.fontSizes.lg,
            fontWeight: 500,
            lineHeight: rem(27),
            margin: 0,
            marginBottom: rem(-16),
        },
    },
}));
