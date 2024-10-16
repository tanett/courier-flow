import React from 'react';
import { getCookie } from 'app/utils/actions-with-cookie';
import { setAuthSessionStorageDate } from 'features/login-user/helpers/setAuthSessionStorageDate';
import { useAppDispatchT } from 'app/state';
import { authStateActions } from '../../../entities-project/auth/model/state-slice';


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

        document.cookie = `remoteToken=""; path=/; domain=${ process.env.REACT_APP_DOMAIN }; max-age=${ -1 }`;
        document.cookie = `remoteRefreshToken=""; path=/; domain=${ process.env.REACT_APP_DOMAIN }; max-age=${ -1 }`;

    }


    return <>{ children }</>;

};
