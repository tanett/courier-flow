import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {  initialCurrencyState } from './initialState';


const merchantCurrencySlice = createSlice({
    name: 'merchantCurrency',
    initialState: initialCurrencyState,
    reducers: {

        // set base currency
        setBaseCurrency: (state, action: PayloadAction<string>) => {

            state.baseCurrency = action.payload;

        },

    },
});

export const merchantCurrencyStateActions = merchantCurrencySlice.actions;

export const merchantCurrencyStateReducer = merchantCurrencySlice.reducer;
