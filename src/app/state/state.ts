import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { userProfileApi } from '../../entities-project/user-profile/api/api';
import { typeUserProfile, userProfileActions, userProfileStateReducer } from '../../entities-project/user-profile/model/state-slice';
import { baseApi } from 'app/api/base-api';
import { authApi } from 'app/api/auth-api';
import { notificationStateReducer } from '../../entities-project/notification/model';
import { authStateReducer } from '../../entities-project/auth/model/state-slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { ordersApi } from '../../entities-project/orders/api/api';
import { ordersStateActions, ordersStateReducer } from '../../entities-project/orders/model/state-slice';
import { merchantCurrencyStateActions, merchantCurrencyStateReducer } from '../../entities-project/merchant-currency/model/state-slice';
import { merchantCurrencyApi } from '../../entities-project/merchant-currency/api/api';
import { defaultCurrency } from 'app/config/currency';
import { bundleStateActions, bundleStateReducer, typeBundle } from 'entities-project/bundle/model/state-slice';
import { bundleApiSlice } from 'entities-project/bundle/api/api';


const ListenerMiddlewareCreate = createListenerMiddleware();

ListenerMiddlewareCreate.startListening({
    predicate: (action, currentState, previousState) => {

        // return true when the listener should run
        return action.type === 'auth/changeAuth' && !!action.payload;

    },
    effect: async (action, listenerApi) => {

        try {

            const userProfileResponse = await listenerApi.dispatch(userProfileApi.endpoints.getCurrentUser.initiate({}));

            listenerApi.dispatch(userProfileActions.changeUserProfile(userProfileResponse.data as typeUserProfile));

        } catch (err) {

            // TODO: error
            console.log('state.ts 35:', err);

        }
        try {

            const terminalToken = sessionStorage.getItem('accessTokenTerminal');

            if(terminalToken) {
                const bundleResponse = await listenerApi.dispatch(bundleApiSlice.endpoints.getBundle.initiate(terminalToken));

                listenerApi.dispatch(bundleStateActions.setBundle(bundleResponse.data as typeBundle));
            }



        } catch (err) {

            // TODO: error
            console.log('state.ts 35:', err);

        }
        try {

            const response = await listenerApi.dispatch(ordersApi.endpoints.getOrdersStatusesList.initiate({}));

            listenerApi.dispatch(ordersStateActions.setStatusesList(response.data));

        } catch (err) {

            // TODO: error
            console.log('state.ts 35:', err);

        }

        try {

            const responseBaseCurrency = await listenerApi.dispatch(merchantCurrencyApi.endpoints.getBaseCurrency.initiate(undefined));

            listenerApi.dispatch(merchantCurrencyStateActions.setBaseCurrency(responseBaseCurrency.data ?? defaultCurrency));

        } catch (err) {

            // TODO: error
            console.log('state.ts 35:', err);

        }

        // listenerApi.dispatch(resourceLoaded(res.data))
        // currentUserApi.trackUsage(action.type, user, specialData)

    },
});


export const state = configureStore({
    reducer: {
        [ baseApi.reducerPath ]: baseApi.reducer,
        [ authApi.reducerPath ]: authApi.reducer,
        notifications: notificationStateReducer,
        auth: authStateReducer,
        userProfile: userProfileStateReducer,
        orders: ordersStateReducer,
        merchantCurrency: merchantCurrencyStateReducer,
        bundle: bundleStateReducer,

    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {

        return getDefaultMiddleware({ serializableCheck: false })
            .concat(baseApi.middleware)
            .concat(authApi.middleware)
            .prepend(ListenerMiddlewareCreate.middleware);

    },
});

setupListeners(state.dispatch);
