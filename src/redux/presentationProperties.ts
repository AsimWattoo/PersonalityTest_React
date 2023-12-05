import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createDefaultStyle, createButtonStyle, createOptionStyle } from "./shared";
import type { SharedPropertyUpdate, SharedPropertyRemove } from "./shared";

const initialState = {
    properties: {}
}

export const presentationSlice = createSlice({
    name: "presentation",
    initialState: initialState,
    reducers: {
        initializeProperties: (state, action) => {
          state.properties = action.payload;
        },
        updateProperty: (state, action: PayloadAction<SharedPropertyUpdate>) => {
            let payload = action.payload;
            state.properties[payload.propertySection][payload.propertyName] = payload.value;
        },
        addProperty: (state, action: PayloadAction<SharedPropertyUpdate>) => {
            let payload = action.payload;
            state.properties[payload.propertySection][payload.propertyName] = payload.value;
        },
        removeProperty: (state, action: PayloadAction<SharedPropertyRemove>) => {
            let payload = action.payload;
            for(let propertyName of payload.propertyNames) {
                delete state.properties[payload.propertySection][propertyName]
            }
        },
        resetProperties: (state, action) => {
          state.properties = action.payload;
        }
    }
});

export const {updateProperty, addProperty, removeProperty, resetProperties, initializeProperties} = presentationSlice.actions;

export default presentationSlice.reducer;