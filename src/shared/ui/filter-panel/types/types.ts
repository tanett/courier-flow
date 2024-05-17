import React from 'react';

export interface typeFilterPanel {
    withFind?: {
        placeholder: string,
        minValueLength?: number
    } | boolean
    filterComponent?: React.ReactNode
}

export interface typeFindBlock {
    placeholder?: string
    minValueLength?: number
}

export interface typeFilterBlock {
    size?: 'sx' | 'md',
    filterComponent: React.ReactNode
}

export interface typeFilterButtonsBar {
    onReset?: () => void,
}
