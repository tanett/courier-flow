import React from 'react';

export interface typeActionWithRequiredIcon {
    label: string
    handler: () => void
    icon: React.ReactNode
    textColor?: string
    disabled?: boolean
}

export type typeActionWithPartialIcon = Omit<typeActionWithRequiredIcon, 'icon'> & Partial<Pick<typeActionWithRequiredIcon,'icon'>>

export type typeActionList =[typeActionWithRequiredIcon, ...typeActionWithPartialIcon[]]

export interface typeTableActionsProps {
    actions: typeActionList
    visibleCount?: number
    align?: 'center' | 'right',
    dividerIndex?: number

}
