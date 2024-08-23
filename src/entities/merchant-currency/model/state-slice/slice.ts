import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialCurrencyState } from './initialState';
import { defaultCurrency } from '../../../../app/config/currency';


const merchantCurrencySlice = createSlice({
    name: 'merchantCurrency',
    initialState: initialCurrencyState,
    reducers: {

        // set base currency
        setBaseCurrency: (state, action: PayloadAction<string>) => {

            state.baseCurrency = action.payload;

        },
        setCurrencyList: (state, action: PayloadAction<string[]>) => {

            state.currencyList = action.payload.length > 0 ? action.payload : [ defaultCurrency ];

        },

    },
});

export const merchantCurrencyStateActions = merchantCurrencySlice.actions;

export const merchantCurrencyStateReducer = merchantCurrencySlice.reducer;
