import React from 'react';

export interface typeAction {
    label: string
    handler: () => void
    icon: React.ReactNode
}

export interface typeTableActionsProps {
    actions: typeAction[]
    visibleCount?: number
    align?: 'center' | 'right'
}
