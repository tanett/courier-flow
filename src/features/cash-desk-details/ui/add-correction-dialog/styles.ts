import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    container: {
        flexDirection: 'column',
        gap: rem(16),
    },
    fieldContainer: {
        width: rem(550),
        flexDirection: 'column',
        gap: rem(6),
    },
    label: { fontWeight: 500 },
    buttonContainer: { gap: rem(16) },
    typeButton: { flexGrow: 1 },
    typeButtonOutline: {
        fontWeight: 400,
        color: theme.colors.gray[ 9 ],
        borderColor: theme.colors.borderColor[ 0 ],
    },
    submitButtonContainer: {
        justifyContent: 'center',
        gap: rem(24),
    },
    textAreaContainer: {
        'textarea::placeholder': {
            color: theme.colors.gray[ 3 ],
            fontSize: rem(14),
        },
        'textarea': { width: '100%' },
    },
    textAreaSymbolCount: {
        justifyContent: 'flex-end',
        fontSize: rem(14),
        color: theme.colors.gray[ 3 ],
        marginRight: rem(2),
    },
    currencyContainer: {
        border: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        borderRadius: rem(4),
        overflow: 'hidden',
        '&:focus-within': {
            boxShadow: `0 0 0 3px ${theme.colors.primary[ 1 ]}`,
            border: `1px solid ${theme.colors.primary[ 6 ]}`,
        },
        '.mantine-InputWrapper-root input': {
            display: 'flex',
            border: 'none',
            borderRadius: '4px 0 0 4px',
            paddingRight: rem(12),
        },
        '.mantine-InputWrapper-root input:focus': { boxShadow: 'none' },
        '.mantine-InputWrapper-error': { display: 'none' },
        '.mantine-Input-wrapper': { marginBottom: 0 },
    },
    errorCurrencyContainer: { borderColor: theme.colors.red[ 5 ] },
    currencyInput: { flexGrow: 1 },
    currencySelect: {
        borderLeft: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        width: rem(80),
    },
    errorMessage: {
        fontSize: rem(12),
        color: theme.colors.red[ 5 ],
    },
}));
