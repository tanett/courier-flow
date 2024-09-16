import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialBundleState } from './initialState';

import { typeBundle } from 'entities-project/bundle/model/state-slice/types';


const bundleSlice = createSlice({
    name: 'bundle',
    initialState: initialBundleState,
    reducers: {

        // set bundle
        setBundle: (state, action: PayloadAction<typeBundle>) => {

            state.bundle = action.payload;
        },

    },
});

export const bundleStateActions = bundleSlice.actions;

export const bundleStateReducer = bundleSlice.reducer;
