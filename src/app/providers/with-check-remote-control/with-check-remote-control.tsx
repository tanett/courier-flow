import React, { useEffect } from 'react';
import { deleteCookie, getCookie } from 'app/utils/actions-with-cookie';
import { setAuthSessionStorageDate } from 'features/login/helpers/setAuthSessionStorageDate';
import { useAppDispatchT } from 'app/state';
import { authStateActions } from '../../../entities/auth/model/state-slice';


export const WithCheckRemoteControl:React.FC<React.PropsWithChildren>  = ({children}) => {

    const dispatchAppT = useAppDispatchT();
    const remoteToken = getCookie('remoteToken')
    const refreshToken = getCookie('remoteRefreshToken')

    if(remoteToken && refreshToken) {

        setAuthSessionStorageDate({accessToken: refreshToken, accessTokenExpiresAt: '', accessTokenIssuedAt: '', X_CSRF_TOKEN: refreshToken})

        dispatchAppT(authStateActions.setRemoteControl(true));

    }

    useEffect(() => {

        const handlerUnload = () => {

            deleteCookie('remoteToken')

            deleteCookie('remoteRefreshToken')

        };

        window.addEventListener('unload', handlerUnload);

        return () => {
            window.removeEventListener('unload', handlerUnload);
        };
    }, []);

    return <>{children}</>

};
