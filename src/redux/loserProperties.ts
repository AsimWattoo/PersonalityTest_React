import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SharedPropertyUpdate, SharedPropertyRemove } from "./shared";

interface PropertiesState {
    properties: {} | null
}

const initialState = {
    properties: null
} as PropertiesState

export const loserPropertiesSlice = createSlice({
    name: "Loser",
    initialState: initialState,
    reducers: {
        initializeProperties: (state, action) => {
            state.properties = action.payload;
        },
        updateProperty: (state, action: PayloadAction<SharedPropertyUpdate>) => {
            if(state.properties != null) {
                let payload = action.payload;
                state.properties[payload.propertySection][payload.propertyName] = payload.value;
            }
        },
        addProperty: (state, action: PayloadAction<SharedPropertyUpdate>) => {
            if(state.properties != null) {
                let payload = action.payload;
                state.properties[payload.propertySection][payload.propertyName] = payload.value;
            }
        },
        removeProperty: (state, action: PayloadAction<SharedPropertyRemove>) => {
            if(state.properties != null) {
                let payload = action.payload;
                for(let propertyName of payload.propertyNames) {
                    delete state.properties[payload.propertySection][propertyName]
                }
            }
        },
        resetProperties: (state, action) => {
          if(state.properties != null) {
            state.properties = null;
          }
        }
    }
});

export const {updateProperty, addProperty, removeProperty, resetProperties, initializeProperties} = loserPropertiesSlice.actions;

export default loserPropertiesSlice.reducer;