import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    dynamicActivate,
    getSystemLanguage,
} from 'app/providers/with-locales/with-locales';
import { initialProductsState } from './initialState';
import { clearAuthSessionStorageDate } from 'features/login/helpers/setAuthSessionStorageDate';
import { typeProductAdditionalFieldInfo } from 'entities/products/model/state-slice/types';



const productsSlice = createSlice({
    name: 'products',
    initialState: initialProductsState,
    reducers: {

        // set info
        setAdditionalInfoList: (state, action: PayloadAction<typeProductAdditionalFieldInfo[] | undefined>) => {

            state.additionalFieldInfo = action.payload;

        },

    },
});

export const productsStateActions = productsSlice.actions;

export const productsStateReducer = productsSlice.reducer;
