import { LoadingOverlay } from '@mantine/core';
import React from 'react';


export const LoaderOverlay: React.FC = () => {

    return (
        <LoadingOverlay visible={true} overlayBlur={1} />
    );

};
