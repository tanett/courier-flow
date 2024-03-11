import React from 'react';
import { typeWithRememberLoginHelperProps } from './types';
import { useStyles } from './styles';
import { getLastLogins } from './utils';
import { useFocusWithin } from '@mantine/hooks';


export const WithRememberLoginHelper: React.FC<typeWithRememberLoginHelperProps> = ({ login, setLogin, children }) => {

    const { classes } = useStyles();

    const loginList = getLastLogins();

    const { ref, focused } = useFocusWithin();

    const onClick = (login: string) => {

        setLogin(login);

    };

    return (
        <div ref={ref} className={classes.wrapper}>
            {children}
            {focused && login && !loginList.includes(login) && loginList.length > 0 && <div className={classes.helperWrapper}>
                <div className={classes.helper}>
                    {loginList.map(item => <button type="button" key={item} onClick={() => onClick(item)} className={classes.button}>{item}</button>)}
                </div>
            </div>}
        </div>
    );

};
