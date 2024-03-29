import React from 'react';

export enum dialogIcon {
    none = 'none',
    attention = 'attention'
}

export interface typeDialogProps extends React.PropsWithChildren {
    icon?: dialogIcon
    cancelButton?: { title: string, handler: () => void }
    confirmButton?: { title: string, handler: () => void }
    withoutPadding?: boolean
}
