import React from 'react';

export interface typeFilterPanel {
    withFind?: {placeholder: string} | boolean
    filterComponent?: React.ReactNode
}

export interface typeFindBlock {
    placeholder?: string
}

export interface typeFilterBlock {
    size?: 'sx' | 'md',
    filterComponent: React.ReactNode
}

export interface typeFilterButtonsBar {
    onReset?: () => void,
}
