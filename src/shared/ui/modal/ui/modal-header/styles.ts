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
        paddingLeft: rem(15),
        paddingRight: rem(15),
        marginBottom: rem(24),
        borderBottom: `1px solid ${ theme.colors.borderColor[ 0 ] }`,
        [`@media print`]: {  display: 'none', },
    },
    title: { alignSelf: 'center' },
    buttonContainer: { flexShrink: 1 },
}));
