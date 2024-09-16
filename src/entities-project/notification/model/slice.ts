import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { initialNotificationState } from './initialState';
import { typeCreateNotification } from './types';

const notificationSlice = createSlice({
    name: 'notification',
    initialState: initialNotificationState,
    reducers: {

        // Add notification
        addNotification: (state, action: PayloadAction<typeCreateNotification>) => {

            state.notificationList.push({ ...action.payload, id: Date.now() });

        },

        // Remove notification
        removeNotification: (state, action: PayloadAction<number>) => {

            state.notificationList = state.notificationList.filter(item => item.id !== action.payload);

        },

    },
});

export const notificationActions = notificationSlice.actions;

export const notificationStateReducer = notificationSlice.reducer;
