import React, { useEffect } from 'react';
import { useAppDispatchT, useSelectorT } from '../../state';
import { useLocation, useNavigate } from 'react-router-dom';
import { authStateActions } from '../../../entities/auth/model/state-slice';
import { routerPaths } from '../../config/router-paths';
import { LoaderAria } from '../../../shared/ui/loader-area/loader-aria';

export const WithProtectedRouts: React.FC<React.PropsWithChildren> = ({ children }) => {

    const dispatchAppT = useAppDispatchT();

    // const [ isLoading, setLoading ] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const auth = useSelectorT(state => state.auth.auth);

    const accessToken = sessionStorage.getItem('accessTokenValue');
    const refreshToken = sessionStorage.getItem('refresh');

    const checkTokenHandler = () => {

        if (accessToken && refreshToken) {

            if (!auth) {

                dispatchAppT(authStateActions.changeAuth(true));

                /* navigate(location, {
                    replace: true,
                    state: location.state,
                }); */

            }

        } else if (auth) {

            dispatchAppT(authStateActions.changeAuth(false));
            navigate(routerPaths.login, {
                replace: true,
                state: {
                    ...location.state,
                    fromPage: location.pathname,
                },
            });

        } else {

            navigate(routerPaths.login, {
                replace: true,
                state: {
                    ...location.state,
                    fromPage: location.pathname,
                },
            });

        }

    };

    useEffect(() => {

        checkTokenHandler();

    }, [ auth, accessToken, refreshToken ]);

    return (
        auth ? <>{children}</> : <LoaderAria/>
    );

};
