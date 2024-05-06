import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    dynamicActivate,
    getSystemLanguage,
} from 'app/providers/with-locales/with-locales';
import { initialAuthState } from './initialState';
import { clearAuthSessionStorageDate } from 'features/login/helpers/setAuthSessionStorageDate';
import { typeFirstLoginData } from 'entities/auth/model/state-slice/types';
import { deleteCookie } from 'app/utils/actions-with-cookie';


const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {

        // Change Auth
        changeAuth: (state, action: PayloadAction<boolean>) => {

            state.auth = action.payload;

            if (!action.payload) {


                console.log('logout');
                clearAuthSessionStorageDate();
                deleteCookie('remoteToken')
                deleteCookie('remoteRefreshToken')
                localStorage.removeItem('i18nextLng');

                dynamicActivate(getSystemLanguage()).then();

            }

        },

        // set remote control
        setRemoteControl: (state, action: PayloadAction<boolean >) => {

            state.remoteControl = action.payload;

        },

        // set first login data
        setFirstLoginData: (state, action: PayloadAction<typeFirstLoginData >) => {

            state.firstLoginData = action.payload;

        },

        // delete first login data
        deleteFirstLoginData: (state) => {

            state.firstLoginData = undefined;

        },
    },
});

export const authStateActions = authSlice.actions;

export const authStateReducer = authSlice.reducer;
