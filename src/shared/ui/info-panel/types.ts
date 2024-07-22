import { BlockData } from './block-data';
import React from 'react';

export type typeInfoPanelExtensions = {
    BlockData: typeof BlockData
}

export interface typeBlockDataProps extends React.PropsWithChildren{
    icon?: React.ReactNode
    label: string
    withUnderline?: boolean
    className?: string
}
