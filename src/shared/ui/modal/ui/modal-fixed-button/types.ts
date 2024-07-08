import React from 'react';

export type typeModalFixedButton = {
    onClick: () => void;
    onClose?: () => void;
    label?: string;
    icon?:  React.ReactNode
}
