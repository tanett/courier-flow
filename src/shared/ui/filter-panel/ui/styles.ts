import { createStyles, rem } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
    wrapper: {
        alignItems: 'center',
        gap: rem(30),
    },
    findWrapper: { flexGrow: 1 },
    inputField: {
        '& input': {
            borderColor: theme.colors.borderColor[0],
            paddingTop: rem(18),
            paddingBottom: rem(18),
            height: rem(44),
            '&::placeholder': {
                fontSize: theme.fontSizes.lg,
                color: theme.colors.gray[3],
                lineHeight: rem(20),
                letterSpacing: 0.3,
            },
        },
    },
    iconFind: {
        width: rem(20),
        height: rem(20),
        color: theme.black,
    },
    iconClose: {
        width: rem(20),
        height: rem(20),
        color: theme.black,
    },
    filterDrawerHeader: {
        flexGrow: 1,
        fontSize: rem(22),
        padding: rem(30),
        paddingBottom: rem(22),
        borderBottom: `1px solid ${ theme.colors.borderColor[0] }`,
    },
    filterDrawerTitle: {
        flexGrow: 1,
        color: theme.colors.primary[5],
        fontWeight: 600,
        letterSpacing: rem(0.3),
    },
    filterDrawerContainer: { flexDirection: 'column' },
    filterContainer: {
        flexDirection: 'column',
        width: '100%',

        '& form': {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: rem(42),
            padding: rem(30),
            paddingTop: rem(24),
        },
    },
    filterButtonsContainer: {
        justifyContent: 'end',
        gap: rem(24),
        marginTop: rem(26),
        '& .mantine-Button-root': {
            fontSize: theme.fontSizes.md,
            fontWeight: 600,
            letterSpacing: rem(0.3),
            minWidth: rem(165),
        },
    },
    filterFormWrapper: {
        flexDirection: 'column',
        gap: rem(42),
    },
    filterOpenButton: {
        width: rem(167),
        fontSize: theme.fontSizes.md,
        fontWeight: 700,
        letterSpacing: rem(0.3),
        '& .mantine-Button-leftIcon': {
            width: rem(20),
            height: rem(20),
            color: theme.colors.primary[5],
        },
        '& .mantine-Button-rightIcon': {
            width: rem(36),
            height: rem(34),
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': {
                width: rem(20),
                height: rem(20),
                color: theme.colors.yellow[5],

            },
            borderLeft: `1px solid ${ theme.colors.primary[5] }`,
        },
    },
    buttonRightPadding: {  '&.mantine-Button-root': {paddingRight:'2px',},},
    resetActiveIcon: {'&:hover': { backgroundColor: theme.colors.primary[ 0 ] },}
}));
