import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    flexColumn: {
        flexDirection: 'column',
        gap: theme.spacing.xs,
        '& .mantine-InputWrapper-root': {
            width: '100%',
            maxWidth: 'none',
        }
    },
    cleanStyle: {
        appearance: 'none',
        border: 'none',
    },
    fieldset: {
        padding: '0',
        border: 'none',
        flexDirection: 'column',
        gap: rem(8),
        '& .mantine-Title-root': {
            color: theme.colors.primary[5],
            fontSize: theme.fontSizes.lg,
            fontWeight: 500,
            lineHeight: '150%',
        },
    },
    formGrid: { gap: `${ theme.spacing.md } ${ theme.spacing.xl }` },
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
    tab: {
        '& .mantine-Tabs-tabsList': { border: 'none' },
        '& .mantine-Tabs-tab': {
            borderColor: theme.colors.gray[3],
            borderTopRightRadius: rem(4),
            borderTopLeftRadius: rem(4),
            marginRight: rem(4),
            fontSize: theme.fontSizes.md,
            lineHeight: rem(20),
            letterSpacing: 0.3,
            '&:hover': { color: theme.colors.primary[5] },
            '&[data-active=true]': {
                borderColor: theme.colors.borderColor[0],
                color: theme.colors.primary[5],
                fontWeight: 700,
                backgroundColor: theme.white,
                borderBottom: '1px solid transparent',
            },
        },
        '& .mantine-Tabs-panel': {
            height: rem(684),
            padding: '10px 8px',
            border: `1px solid ${ theme.colors.borderColor[0] }`,
            borderBottomLeftRadius: rem(8),
            borderBottomRightRadius: rem(8),
            borderTopRightRadius: rem(8),
            backgroundColor: theme.white,
        },

    },
    fullWidthGrid: {
        '&.mantine-InputWrapper-root': {
            maxWidth: '100%',
            width: '100%',
            minWidth: '100%',
            gridColumn: '1 / -1',
        },
        '& .mantine-Textarea-wrapper': {
            maxWidth: '100%',
            width: '100%',
            minWidth: '100%',
            gridColumn: '1 / -1',
        },
    },
    errorInTab:{
        '&.mantine-Tabs-tab':{ borderColor: theme.colors.red[5],},
        backgroundColor: theme.fn.rgba(theme.colors.red[5], 0.1)
    },
    discountContainer:{
        width: '100%',
        zIndex: 999,
        backgroundColor: theme.white,
        position: 'absolute',
        bottom:0,
        borderTop: `1px solid ${ theme.colors.gray[3] }`,
        borderBottom: `1px solid ${ theme.colors.gray[3] }`,
        paddingTop: '12px',
        paddingBottom: '12px'
    },
    popoverCustomerTips:{
        boxShadow: `0px 6px 15px 0px #322B2B1A`,
        maxHeight: rem(141),
        overflow: 'auto',
        border: 'none',
        top: '80px',
        '& .mantine-Popover-dropdown':{ top: '80px',},
        padding: 0
    },
}));
