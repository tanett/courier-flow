import React from 'react';

export enum dialogIcon {
    attention = 'attention'
}

export interface typeDialogProps extends React.PropsWithChildren {
    icon?: dialogIcon
    cancelButton?: { title: string, handler: () => void }
    confirmButton?: { title: string, handler: () => void }
}
