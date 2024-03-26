import { createStyles, em, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    componentWrapper: {
        maxWidth: rem(546),
        '& label': {
            fontWeight: 500,
            color: theme.black,
            fontSize: em(16),
            letterSpacing: rem(0.3),
            marginBottom: rem(2),
        },
        '& .mantine-InputWrapper-error': {
            marginTop: rem(3),
            fontSize: theme.fontSizes.xs,
        },
        '&.mantine-InputWrapper-root input': {
            border: 'none',
            boxShadow: 'none',
        },
    },
    inputWrapper: {
        height: rem(40),
        '& .mantine-InputWrapper-root input': {
            border: 'none',
            boxShadow: 'none',
        },
        border: `1px solid ${theme.colors.borderColor[ 0 ]}`,
        '&:focus, &:focus-within, &:active': {
            borderColor: theme.colors.primary[ 5 ],
            boxShadow: `0 0 0 3px #DBEAFE`,
        },
        borderRadius: rem(4),
        overflow: 'hidden',
    },
    inputWrapperError: {
        border: `1px solid ${theme.colors.red[ 5 ]}`,
        color: theme.colors.red[ 5 ],
    },
    countrySelector: {
        overflow: 'hidden',
        flexGrow: 0,
        flexShrink: 1,
        minWidth: rem(70),
        maxWidth: rem(140),
        '&.mantine-InputWrapper-root, .mantine-InputWrapper-root, .mantine-Select-root': {
            maxWidth: rem(132),
            borderLeft: 'none',
            borderTop: 'none',
            borderBottom: 'none',
            borderRight: `1px solid ${theme.colors.borderColor[ 0 ]}`,
            width: 'fit-content',
        },
        input: {
            minWidth: rem(70),
            maxWidth: rem(140),
        },

        '& .mantine-Select-input': {
            border: 'none',
            fontSize: theme.fontSizes.sm,
        },
        '& input:active': {
            border: 'none',
            boxShadow: 'none',
        },
        '& input:focus': {
            border: 'none',
            boxShadow: 'none',
        },
    },
    inputPhone: {
        flexGrow: 1,
        border: 'none',
        outline: 'none',
        overflow: 'hidden',
        fontFamily: 'Gilroy',
        fontSize: theme.fontSizes.md,
        fontWeight: 400,
        letterSpacing: 0.3,
        minWidth: rem(200),
        '&:active, &:focus, &:focus-visible': {
            border: 'none',
            boxShadow: 'none',
            outline: 'none',
        },

        // '& input':{
        //     appearance: 'none',
        //     border: 'none',
        //     outline: 'none',
        //     '&:active, &:focus, &:focus-visible': {
        //         border: 'none',
        //         boxShadow: 'none',
        //         outline: 'none',
        //     },
        // },
        '& .mantine-Input-input': {
            border: 'none',
            '&:active, &:focus, &:focus-visible': {
                border: 'none',
                boxShadow: 'none',
                outline: 'none',
            },
        },
    },
}));
