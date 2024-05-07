import React from 'react';
import { getCookie } from 'app/utils/actions-with-cookie';
import { setAuthSessionStorageDate } from 'features/login/helpers/setAuthSessionStorageDate';
import { useAppDispatchT } from 'app/state';
import { authStateActions } from '../../../entities/auth/model/state-slice';


export const WithCheckRemoteControl: React.FC<React.PropsWithChildren> = ({ children }) => {

    const dispatchAppT = useAppDispatchT();
    const remoteToken = getCookie('remoteToken');
    const refreshToken = getCookie('remoteRefreshToken');


    if (remoteToken && refreshToken) {

        setAuthSessionStorageDate({
            accessToken: remoteToken,
            accessTokenExpiresAt: '',
            accessTokenIssuedAt: '',
            X_CSRF_TOKEN: refreshToken

        });

        dispatchAppT(authStateActions.setRemoteControl(true));
        dispatchAppT(authStateActions.changeAuth(true));

        const location = window.location;
        console.log('#####', location.hostname)
        document.cookie = `remoteToken=""; path=/; domain=${ '.sksoldev.com' }; max-age=${ -1 }`;
        document.cookie = `remoteRefreshToken=""; path=/; domain=${ '.sksoldev.com' }; max-age=${ -1 }`;

    }


    return <>{ children }</>;

};
