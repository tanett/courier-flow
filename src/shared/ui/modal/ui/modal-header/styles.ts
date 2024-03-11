import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    header: {
        fontSize: rem(20),
        fontWeight: 600,
        color: theme.colors.primary[ 5 ],
        gap: rem(24),
        justifyContent: 'space-between',
        alignItems: 'start',
        paddingBottom: rem(16),
        marginBottom: rem(24),
        borderBottom: `1px solid ${theme.colors.borderColor[ 0 ]}`,
    },
    title: { alignSelf: 'center' },
    buttonContainer: { flexShrink: 1 },
}));
