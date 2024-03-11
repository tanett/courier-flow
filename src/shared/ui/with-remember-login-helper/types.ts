import { PropsWithChildren } from 'react';

export interface typeWithRememberLoginHelperProps extends PropsWithChildren {
    login: string,
    setLogin: (login: string) => void,
}
