import React from 'react';

export type typeButtonAsLink = {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
    label: string
    id?: string
}
