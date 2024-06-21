import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialSoldProductsDetailsState } from './initialState';
import { typeAdvanceProduct } from './types';


const soldProductsSlice = createSlice({
    name: 'soldProductsState',
    initialState: initialSoldProductsDetailsState,
    reducers: {

        // set info
        setSoldProductInfo: (state, action: PayloadAction<typeAdvanceProduct | undefined>) => {

            state.soldProduct = action.payload;

        },

    },
});

export const soldProductsStateActions = soldProductsSlice.actions;

export const soldProductsStateReducer = soldProductsSlice.reducer;
