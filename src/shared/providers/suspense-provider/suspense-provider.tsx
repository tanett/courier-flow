import React, { PropsWithChildren, Suspense } from 'react';
import { LoaderAria } from '../../ui/loader-area/loader-aria';

export const SuspenseProvider: React.FC<PropsWithChildren> = ({ children }) => {

    return (
        <Suspense fallback={<LoaderAria/>}>
            {children}
        </Suspense>
    );

};
