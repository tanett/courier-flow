import React from 'react';
import { Body } from '../ui/modal-body/modal-body';
import { Header } from '../ui/modal-header/modal-header';

export interface typeModalProps extends React.PropsWithChildren {
    opened: boolean
    onCloseByOverlay?: () => void
    modalWidth?: 'auto' | 'dialog' | 'roleDetails'
    centered?: boolean
}

export type typeModalExtensions = {
    Header: typeof Header
    Body: typeof Body
}
