import { iLoginResponseTransform } from 'entities-project/auth/api/types';

export const setAuthSessionStorageDate = (authObject: iLoginResponseTransform) => {

    sessionStorage.setItem('accessTokenValue', authObject.accessToken);
    sessionStorage.setItem('accessTokenExpiresAt', String(authObject.accessTokenExpiresAt));
    sessionStorage.setItem('refresh', String(authObject.X_CSRF_TOKEN));

};

export const setAuthTerminalSessionStorageDate = (authObject: iLoginResponseTransform) => {

    sessionStorage.setItem('accessTokenTerminal', authObject.accessToken);
    sessionStorage.setItem('accessTokenTerminalExpiresAt', String(authObject.accessTokenExpiresAt));
    sessionStorage.setItem('refreshTerminal', String(authObject.X_CSRF_TOKEN));

};

export const clearAuthSessionStorageDate = () => {

    sessionStorage.clear();

};
