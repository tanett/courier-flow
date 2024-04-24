import React from 'react';

export interface typeSidePanelProps extends React.PropsWithChildren{
    size?: 'sm' | 'md',
    title: React.ReactNode
    isOpened: boolean,
    onClose: () => void,
}
