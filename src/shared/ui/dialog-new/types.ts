import React from 'react';

export enum dialogIcon {
    none = 'none',
    attention = 'attention',
    success = 'success',
    error = 'error',
}

export interface typeDialogProps extends React.PropsWithChildren {
    icon?: dialogIcon
    cancelButton?: { title: string, handler: () => void, disabled?: boolean }
    confirmButton?: { title: string, handler: () => void, disabled?: boolean }
    withoutPadding?: boolean
    withMarginTopFat?: boolean
    withScroll?: boolean
}
