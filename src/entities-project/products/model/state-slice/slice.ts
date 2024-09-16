import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialProductsState } from './initialState';
import { typeProductAdditionalFieldInfo } from 'entities-project/products/model/state-slice/types';


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
