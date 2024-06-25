import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {  initialTerminalConfigurationsState } from './initialState';
import { typeAvailableModulesTerminalConfigurations } from './types';


const terminalConfigurationsSlice = createSlice({
    name: 'terminalConfigurations',
    initialState: initialTerminalConfigurationsState,
    reducers: {

        // set info
        setAvailableModules: (state, action: PayloadAction<typeAvailableModulesTerminalConfigurations[] | undefined>) => {

            state.availableModules = action.payload;

        },

    },
});

export const productsStateActions = terminalConfigurationsSlice.actions;

export const productsStateReducer = terminalConfigurationsSlice.reducer;
