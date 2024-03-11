import React from 'react';

export const Body: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <tbody>
            {children}
        </tbody>
    );

};
