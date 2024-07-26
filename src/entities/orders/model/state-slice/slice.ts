import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialOrdersState } from './initialState';
import { typeOrderStatus } from 'entities/orders/model/state-slice/types';


const ordersSlice = createSlice({
    name: 'orders',
    initialState: initialOrdersState,
    reducers: {

        // set info
        setStatusesList: (state, action: PayloadAction<typeOrderStatus[] | undefined>) => {

            state.statuses = action.payload;

        },

    },
});

export const ordersStateActions = ordersSlice.actions;

export const ordersStateReducer = ordersSlice.reducer;
