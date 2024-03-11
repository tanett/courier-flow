import React from 'react';
import { Provider } from 'react-redux';
import { state } from 'app/state';

export const withState = (component: () => React.ReactNode) => () => {

    return (
        <Provider store={state}>
            {component()}
        </Provider>
    );

};
