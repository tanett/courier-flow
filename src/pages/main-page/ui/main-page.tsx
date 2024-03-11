import React from 'react';
import { Navigate } from 'react-router-dom';
import { routerPaths } from '../../../app/config/router-paths';

export const MainPage: React.FC = () => {

    return (
        <Navigate to={routerPaths.dashboard} replace={true} />
    );

};
