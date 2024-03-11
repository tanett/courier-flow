import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { dynamicActivate } from 'app/providers/with-locales/with-locales';
import { initialUserState } from './initialState';
import { typeUserProfile } from './types';


const userProfileSlice = createSlice({
    name: 'userProfile',
    initialState: initialUserState,
    reducers: {

        // Change user profile
        changeUserProfile: (state, action: PayloadAction<typeUserProfile>) => { // todo fix it

            state.userProfile = action.payload;

            const locale = action.payload.actor.userSettings?.locale;
            if (locale) {

                localStorage.setItem('i18nextLng', locale);
                dynamicActivate(locale).then();

            }

        },

        // update user profile
        updateUserProfile: (state, action: PayloadAction<typeUserProfile['actor']>) => {

            state.userProfile = { permissions: state.userProfile?.permissions || [], actor: action.payload };

            const locale = action.payload.userSettings?.locale;
            if (locale) {

                localStorage.setItem('i18nextLng', locale);
                dynamicActivate(locale).then();

            }

        },

    },
});

export const userProfileActions = userProfileSlice.actions;

export const userProfileStateReducer = userProfileSlice.reducer;
