import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SharedPropertyUpdate, SharedPropertyRemove } from "./shared";
import { Placeholder } from "reactstrap";

interface PropertiesState {
    properties: {} | null
}

const initialState = {
    properties: null
} as PropertiesState

export const thankyouPropertiesSlice = createSlice({
    name: "ThankYou",
    initialState: initialState,
    reducers: {
        initializeProperties: (state, action) => {
            state.properties = action.payload;
        },
        updateHeading: (state, action:PayloadAction<string>) => {
            state.properties.headingText = action.payload;
        },
        updateDescription: (state, action: PayloadAction<string>) => {
            state.properties.descriptionText = action.payload;
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

export const {updateProperty, addProperty, removeProperty, resetProperties, initializeProperties, updateHeading, updateDescription} = thankyouPropertiesSlice.actions;

export default thankyouPropertiesSlice.reducer;