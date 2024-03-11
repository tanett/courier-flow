import React from 'react';

export enum dialogIcon {
    attention = 'attention'
}

export interface typeDialog extends React.PropsWithChildren {
    opened: boolean
    onClose?: () => void
    withCloseButton?: boolean
    icon?: dialogIcon
    cancelButton?: { title: string, handler: () => void }
    confirmButton?: { title: string, handler: () => void }
}
