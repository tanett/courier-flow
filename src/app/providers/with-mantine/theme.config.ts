import { em, type MantineThemeOverride, rem } from '@mantine/core';

export const theme: MantineThemeOverride = {
    globalStyles: () => ({
        '.mantine-Button-root': {
            paddingRight: rem(24),
            paddingLeft: rem(24),
            paddingTop: rem(6),
            paddingBottom: rem(6),
            minWidth: rem(132),
            '& .mantine-Button-leftIcon': { marginRight: rem(8) },
        },
        '.mantine-InputWrapper-root, .mantine-Textarea-wrapper': {
            maxWidth: rem(546),
            '& label': {
                fontWeight: 500,
                color: theme.black,
                fontSize: em(16),
                letterSpacing: rem(0.3),
                marginBottom: rem(2),
            },
            '& input, .mantine-DatePickerInput-input': {
                border: `1px solid #DDD6FE`,
                borderRadius: rem(4),
                fontSize: em(16),
                fontWeight: 400,
                lineHeight: em(19),
                letterSpacing: em(0.3),
                paddingTop: rem(10),
                paddingBottom: rem(10),
                paddingLeft: rem(12),
                paddingRight: rem(12),
                height: rem(40),
                '&:active, &:focus': { borderColor: '#3B82F6', boxShadow: ` 0 0 0 3px #DBEAFE` },
            },
            '& textarea': {
                border: `1px solid #DDD6FE`,
                borderRadius: rem(4),
                fontSize: em(16),
                fontWeight: 400,
                lineHeight: em(19),
                letterSpacing: em(0.3),
                paddingTop: rem(10),
                paddingBottom: rem(10),
                paddingLeft: rem(12),
                paddingRight: rem(12),
                height: rem(80),
                '&:active, &:focus': { borderColor: '#3B82F6', boxShadow: ` 0 0 0 3px #DBEAFE` },
            },
            '& .mantine-Select-input': { '&:focus, &:active': { borderColor: '#3B82F6', boxShadow: ` 0 0 0 3px #DBEAFE` } },
        },
        '.mantine-MultiSelect-wrapper': {
            border: `none`,
            borderRadius: rem(4),

            '& .mantine-Input-wrapper': {
                '& .mantine-MultiSelect-input': { border: 'none', boxShadow: `none` },

                border: `1px solid #DDD6FE`,
                borderRadius: rem(4),
                '&:focus, &:focus-within, &:active': {
                    borderColor: '#3B82F6',
                    boxShadow: `0 0 0 3px #DBEAFE`,
                },
                '& input': {
                    border: 'none',
                    paddingLeft: 0,
                    '&:active, &:focus': { border: 'none', boxShadow: `none` },
                    '&::placeholder': {
                        fontSize: rem(16),
                        fontWeight: 400,
                        lineHeight: em(19),
                        letterSpacing: em(0.3),
                    },
                },
            },
            '& .mantine-MultiSelect-value, .mantine-MultiSelect-defaultValue': {
                padding: '4px 8px 4px 8px',
                borderRadius: rem(2),
                gap: rem(6),
                backgroundColor: '#DBEAFE',
                fontSize: rem(16),
                fontWeight: 400,
                lineHeight: em(19),
                letterSpacing: em(0.3),
            },
        },
        '& .mantine-CalendarHeader-calendarHeaderLevel, .mantine-CalendarHeader-calendarHeaderControl, .mantine-WeekdaysRow-weekday': {
            color: '#3B82F6',
            fontSize: em(14),
            fontWeight: 600,
            lineHeight: em(20),
        },
        '& .mantine-PasswordInput-wrapper': {
            borderRadius: rem(4),
            '&:focus, &:focus-within, &:active': {
                borderColor: '#3B82F6',
                boxShadow: `0 0 0 3px #DBEAFE`,
            },
        },
        '.mantine-PasswordInput-input': { '& input:active, input:focus': { borderColor: 'none', boxShadow: 'none' } },
        '.mantine-Select-dropdown, .mantine-MultiSelect-dropdown': {
            '& .mantine-Select-item, .mantine-MultiSelect-item': {
                '&[data-selected="true"]': {
                    backgroundColor: '#E9EFFF',
                    color: '#3B82F6',
                    fontWeight: 500,
                },
                '&:hover': { backgroundColor: '#E9EFFF' },
            },
        },
        '.mantine-Tooltip-tooltip': {
            color: theme.black,
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.06), 0px 1px 3px 0px rgba(0, 0, 0, 0.10)',
            fontSize: rem(14),
            padding: `${rem(12)} ${rem(16)}`,
            backgroundColor: theme.white,
        },

    }),
    colorScheme: 'light',
    colors: {
        primary: [
            '#eff6ff', // 50
            '#dbeafe', // 100
            '#bfdbfe', // 200
            '#93C5FD', // 300
            '#60A5FA', // 400
            '#3B82F6', // 500 main brand
            '#2563eb', // 600
            '#1d4ed8', // 700
            '#1e40af', // 800
            '#1e3a8a' // 900
        ],
        primary950: [ '#172554' ],
        gray: [
            '#F9FAFB', // 50
            '#F3F4F6', // 100
            '#E5E7EB', // 200
            '#D1D5DB', // 300
            '#9CA3AF', // 400
            '#6B7280', // 500
            '#4B5563', // 600
            '#374151', // 700
            '#1F2937', // 800
            '#111827' // 900
        ],
        red: [
            '#FEF2F2', // 50
            '#FEE2E2', // 100
            '#FECACA', // 200
            '#FCA5A5', // 300
            '#F87171', // 400
            '#EF4444', // 500
            '#DC2626', // 600
            '#B91C1C', // 700
            '#991B1B', // 800
            '#7F1D1D' // 900
        ],
        yellow: [
            '#FEFCE8', // 50
            '#FEF9C3', // 100
            '#FEF08A', // 200
            '#FDE047', // 300
            '#FBBF24', // 400
            '#F59E0B', // 500
            '#D97706', // 600
            '#B45309', // 700
            '#92400E', // 800
            '#78350F' // 900

        ],
        green: [
            '#F0FDF4', // 50
            '#DCFCE7', // 100
            '#BBF7D0', // 20
            '#86EFAC', // 300
            '#4ADE80', // 400
            '#22C55E', // 500
            '#16A34A', // 600
            '#15803D', // 700
            '#166534', // 800
            '#14532D' // 900
        ],
        borderColor: [
            '#DDD6FE', // input & card stroke colour brand 200
            '#3772FF'
        ],
    },
    black: '#111827',
    white: '#FFFFFF',
    primaryColor: 'primary',
    primaryShade: { light: 5, dark: 8 },
    fontFamily: 'Gilroy, sans-serif',
    fontFamilyMonospace: 'Gilroy, sans-serif',
    headings: {
        fontWeight: 400,
        fontFamily: 'Gilroy, sans-serif',
        sizes: {
            h1: { fontSize: em(20) },
            h2: { fontSize: em(18) },
            h3: { fontSize: em(16) },
            h4: { fontSize: em(14) },
            h5: { fontSize: em(12) },
            h6: { fontSize: em(12) },
        },
    },
    fontSizes: {
        xs: em(12),
        sm: em(14),
        md: em(16),
        lg: em(18),
        lx: em(20),
        xxl: em(22),
        xxxl: em(32),
    },
    spacing: {
        xxxxs: rem(4),
        xxxs: rem(6),
        xxs: rem(8),
        xs: rem(10),
        sm: rem(12),
        md: rem(16),
        lg: rem(20),
        xl: rem(24),
        xxl: rem(32),
        xxxl: rem(60),
    },
};
