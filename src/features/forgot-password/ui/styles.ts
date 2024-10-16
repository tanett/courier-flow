import { createStyles, em, rem } from '@mantine/core';


export const useStyles = createStyles((theme) => ({
    imageWrapper: { width: rem(210) },
    title: {
        fontSize: rem(32),
        fontWeight: 600,
        textAlign: 'center',
        lineHeight: rem(38),
        letterSpacing: 0,
        color: theme.colors.gray[ 8 ],
    },
    inputText: {
        '& .mantine-TextInput-input': {
            paddingLeft: rem(16),
            paddingRight: rem(16),
            paddingTop: rem(20),
            paddingBottom: rem(20),
            height: rem(56),
        },
        '&.mantine-InputWrapper-root': { maxWidth: '100%' },
        '& input': {
            border: 'none',
            fontSize: em(16),
            fontWeight: 400,
            lineHeight: em(19),
            letterSpacing: em(0.3),
            '&:active, &:focus': { borderColor: '#3772FF' },
            '&[data-invalid="true"]': { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
            '&:-internal-autofill-selected': { backgroundColor: 'transparent' },
        },
        '& .mantine-TextInput-label': { fontWeight: 600 },
        '& .mantine-Input-rightSection': { right: '8px' },
        '& .mantine-PasswordInput-label': {
            fontWeight: 600,
            color: theme.black,
            fontSize: em(16),
            letterSpacing: rem(0.3),
            marginBottom: rem(2),
        },
        '& .mantine-PasswordInput-input': {
            paddingLeft: rem(16),
            paddingRight: rem(16),
            paddingTop: rem(18.5),
            paddingBottom: rem(18.5),
            border: `1px solid ${theme.colors.borderColor[ 0 ]}`,
            borderRadius: rem(4),
            height: rem(56),
            '&[data-invalid="true"]': {
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                borderColor: theme.colors.red[ 5 ],
            },

            // '&:focus, &:active': { borderColor: '#3671ff', boxShadow: ` 0 0 0 3px #DBEAFE` },
            '& input': {
                height: rem(56),
                border: 'none',
                fontSize: em(16),
                fontWeight: 400,
                lineHeight: em(19),
                letterSpacing: em(0.3),
                '&[data-invalid="true"]': { backgroundColor: 'transparent' },
                '& input:active, input:focus': {
                    borderColor: 'none',
                    boxShadow: 'none',
                },
            },
            '& .visibilityToggle': { left: '10px' },
        },
    },
    link: {
        color: theme.colors.primary[ 7 ],
        textDecoration: 'underline',
        textDecorationThickness: rem(1),
        textDecorationColor: 'transparent',
        textUnderlineOffset: rem(2),
        transitionProperty: 'all',
        transitionDuration: '0.3s',
        transitionTimingFunction: 'ease',
        '&:hover': { textDecorationColor: theme.colors.primary[ 6 ], color: theme.colors.primary[ 6 ] },
    },
    flex: {
        flexDirection: 'column',
        gap: rem(20),
    },
    form: { position: 'relative' },
    messageBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: theme.spacing.md,
        borderRadius: theme.radius.md,
        backgroundColor: theme.white,
        padding: theme.spacing.xxl,
        paddingTop: 0,
        paddingBottom: theme.spacing.xl,

        // boxShadow: '0px 6px 15px 0px rgba(50, 43, 43, 0.10)',
    },
    messageIcon: {
        display: 'block',
        width: rem(95),
        height: 'auto',
    },
    messageText: {
        paddingTop: theme.spacing.sm,
        paddingBottom: theme.spacing.md,
        fontSize: theme.fontSizes.md,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        height: rem(56),
        marginTop: rem(24),
        fontSize: theme.fontSizes.lg,
        fontWeight: 600,
        backgroundColor: theme.colors.primary[ 5 ],
        '&[data-disabled="true"]': {
            backgroundColor: theme.colors.primary[ 5 ],
            opacity: '0.6',
            color: theme.white,
        },

    },
}));
