import { iLoginResponseTransform } from 'entities/auth/api/types';

export const setAuthSessionStorageDate = (authObject: iLoginResponseTransform) => {

    sessionStorage.setItem('accessTokenValue', authObject.accessToken);
    sessionStorage.setItem('accessTokenExpiresAt', String(authObject.accessTokenExpiresAt));
    sessionStorage.setItem('refresh', String(authObject.X_CSRF_TOKEN));

};

export const clearAuthSessionStorageDate = () => {

    sessionStorage.removeItem('accessTokenValue');
    sessionStorage.removeItem('accessTokenExpiresAt');
    sessionStorage.removeItem('refresh');

};
