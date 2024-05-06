import React, { useEffect } from 'react';
import { SuspenseProvider } from 'shared/providers/suspense-provider/suspense-provider';
import { RouterProvider } from 'react-router-dom';
import { router } from './config/router-config';
import { withMantine } from './providers/with-mantine/with-mantine';
import { withLocales } from './providers/with-locales/with-locales';
import { withState } from './providers/with-state/withState';
import { PageNotification } from 'shared/ui/page-notification';
import { WithCheckRemoteControl } from './providers/with-check-remote-control/with-check-remote-control';


function AppRouter() {

    useEffect(() => {

        document.title = process.env.REACT_APP_NAME ?? document.title;

    }, []);

    return (
        <SuspenseProvider>
            <WithCheckRemoteControl>
            <PageNotification/>
            <RouterProvider router={router} />
            </WithCheckRemoteControl>
        </SuspenseProvider>
    );

}


const withLocalesApp = withLocales(AppRouter);

const withStateApp = withState(withLocalesApp);

export default withMantine(withStateApp);
