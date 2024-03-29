import React from 'react';

export interface typeModalContent {
    title: string,
    content: React.ReactNode
}


export interface typeArchiveProductsDialogProps {
    onCancel: () => void,
}
