import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    flexColumn: {
        flexDirection: 'column',
        gap: theme.spacing.md,
        maxWidth: rem(1185),
        '& .mantine-InputWrapper-root, .mantine-Textarea-wrapper ': { maxWidth: '100%' },
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
    formGrid: {
        gap: `${theme.spacing.md} ${theme.spacing.xl}`,
        '& .mantine-InputWrapper-root': { maxWidth: '100%' },
    },
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
}));
