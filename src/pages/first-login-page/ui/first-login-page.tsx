import React from 'react';
import { ChangePasswordForFirstLogin } from 'features/change-password-for-first-login';
import { useSelectorT } from 'app/state';
import { LoaderAria } from 'shared/ui/loader-area/loader-aria';


const FirstLoginPage: React.FC = () => {

    const oldData = useSelectorT(state => state.auth.firstLoginData);

    return (
        oldData ?
            <ChangePasswordForFirstLogin login={oldData.login} password={oldData.password}/>
            : <LoaderAria/>
    );

};

export default FirstLoginPage;
