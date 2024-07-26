import React from 'react';
import { Body } from '../ui/modal-body/modal-body';
import { Header } from '../ui/modal-header/modal-header';

export interface typeModalProps extends React.PropsWithChildren {
    opened: boolean
    onCloseByOverlay?: () => void
    modalWidth?: 'auto' | 'dialog' | 'roleDetails' | '70%'
    centered?: boolean
    fixedButton?: React.ReactNode
}

export type typeModalExtensions = {
    Header: typeof Header
    Body: typeof Body
}
