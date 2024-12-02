import { Stands } from 'features/select-stand/types';

export const createBaseUrl = () => {

    const stand = localStorage.getItem('stand');
    return stand === Stands.DEV ? process.env.REACT_APP_BASE_API_URL : process.env.REACT_APP_BASE_API_URL_TEST;

};

export const createAuthBaseUrl = () => {

    const stand = localStorage.getItem('stand');
    return stand === Stands.DEV ? process.env.REACT_APP_AUTH_API_URL : process.env.REACT_APP_AUTH_API_URL_TEST;

};
