import React from 'react';

export const Header: React.FC<React.PropsWithChildren> = ({ children }) => {

    return (
        <thead>
            <tr>
                {children}
            </tr>
        </thead>
    );

};
