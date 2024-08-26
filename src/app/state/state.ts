import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import { userProfileApi } from '../../entities/user-profile/api/api';
import { typeUserProfile, userProfileActions, userProfileStateReducer } from '../../entities/user-profile/model/state-slice';
import { baseApi } from 'app/api/base-api';
import { authApi } from 'app/api/auth-api';
import { notificationStateReducer } from '../../entities/notification/model';
import { authStateReducer } from '../../entities/auth/model/state-slice';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsStateActions, productsStateReducer } from '../../entities/products/model/state-slice';
import { productsApi } from '../../entities/products/api/api';
import { soldProductsStateReducer } from '../../entities/advances/model/state-slice';
import { ordersApi } from '../../entities/orders/api/api';
import { ordersStateActions, ordersStateReducer } from '../../entities/orders/model/state-slice';
import { merchantCurrencyStateActions, merchantCurrencyStateReducer } from '../../entities/merchant-currency/model/state-slice';
import { merchantCurrencyApi } from '../../entities/merchant-currency/api/api';
import { defaultCurrency } from 'app/config/currency';


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

            const response = await listenerApi.dispatch(productsApi.endpoints.getAdditionalFieldInfo.initiate({}));

            listenerApi.dispatch(productsStateActions.setAdditionalInfoList(response.data));

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

            const responseCurrencyList = await listenerApi.dispatch(merchantCurrencyApi.endpoints.searchMerchantCurrency.initiate({
                filter: {},
                pagination: {
                    pageNumber: 0,
                    pageSize: 100,
                },
            }));

            listenerApi.dispatch(merchantCurrencyStateActions.setCurrencyList(responseCurrencyList.data?.content.map(item => item.currency).sort() ?? []));


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
        products: productsStateReducer,
        soldProductDetails: soldProductsStateReducer,
        orders: ordersStateReducer,
        merchantCurrency: merchantCurrencyStateReducer,

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
