import React, { useEffect } from 'react';
import { deleteCookie, getCookie } from 'app/utils/actions-with-cookie';
import { setAuthSessionStorageDate } from 'features/login/helpers/setAuthSessionStorageDate';
import { useAppDispatchT } from 'app/state';
import { authStateActions } from '../../../entities/auth/model/state-slice';
import { useNavigate } from 'react-router-dom';
import { routerPaths } from 'app/config/router-paths';


export const WithCheckRemoteControl:React.FC<React.PropsWithChildren>  = ({children}) => {
    console.log('cookie', document.cookie);
    const dispatchAppT = useAppDispatchT();
    const remoteToken = getCookie('remoteToken')
    const refreshToken = getCookie('remoteRefreshToken')

    const navigate = useNavigate();

    if(remoteToken && refreshToken) {
        console.log('if-----------', remoteToken, refreshToken);
        setAuthSessionStorageDate({accessToken: remoteToken, accessTokenExpiresAt: '', accessTokenIssuedAt: '', X_CSRF_TOKEN: refreshToken})

        dispatchAppT(authStateActions.setRemoteControl(true));
        dispatchAppT(authStateActions.changeAuth(true));


navigate(routerPaths.dashboard, {replace: true});
    }

    useEffect(() => {

        const handlerUnload = () => {

            deleteCookie('remoteToken')

            deleteCookie('remoteRefreshToken')

        };

        window.addEventListener('pagehide', handlerUnload);

        return () => {
            window.removeEventListener('pagehide', handlerUnload);
        };
    }, []);
    console.log('end-----------', remoteToken, refreshToken);

    return <>{children}</>

};
