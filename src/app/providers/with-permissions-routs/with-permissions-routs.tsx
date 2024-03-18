import React from 'react';
import { useIsAllowedPermissions } from '../../../entities/users/hooks/use-is-allowed-permissions';
import NotFoundPage from 'pages/not-found-page/ui/not-found-page';

export const WithPermissionsRouts: React.FC<React.PropsWithChildren & {permissions: string[]}> = ({ children, permissions }) => {

    const isAllowedRout = useIsAllowedPermissions(permissions);

    return (
        isAllowedRout ? <>{children}</> : <NotFoundPage/>
    );

};
