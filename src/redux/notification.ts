import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
    message: string,
    isError: boolean
}

let initialState = {
    message: "",
    isError: false,
} as NotificationState;

export const notificationSlice = createSlice({
    name: "Notification",
    initialState: initialState,
    reducers: {
        showNotification(state, action: PayloadAction<NotificationState>) {
            state.message = action.payload.message;
            state.isError = action.payload.isError;
        },
        hideNotification(state, action) {
            state.message = "";
            state.isError = false;
        }
    }
});

export type {NotificationState};

export const {showNotification, hideNotification} = notificationSlice.actions;

export default notificationSlice.reducer;