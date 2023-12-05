import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type SharedPropertyUpdate = {
  propertySection: string,
  propertyName: string,
  value: number | string
}

type SharedPropertyRemove = {
  propertySection: string,
  propertyNames: string[]
}

function createDefaultStyle (fontSize: number) {
    return {
      "fontFamily": "Arial",
      "fontStyle": "normal",
      "fontSize": fontSize,
      "fontWeight": 400,
      "textAlign": "left",
      "color": '#000000',
      "borderColor": '#dedede',
      "borderWidth": 1,
      "borderStyle": "Solid",
      "borderRadius": 5,
      "marginTop": 0,
      "marginRight": 0,
      "marginBottom": 0,
      "marginLeft": 0,
      "paddingTop": 8,
      "paddingRight": 8,
      "paddingBottom": 8,
      "paddingLeft": 8,
      "backgroundColor": "#FFFFFF",
    }
  }
  
  function createOptionStyle() {
    return {
      "fontFamily": "Arial",
      "fontStyle": "normal",
      "fontSize": 18,
      "fontWeight": 400,
      "textAlign": "left",
      "color": '#000000',
      "borderColor": '#dedede',
      "borderWidth": 1,
      "borderStyle": "Solid",
      "borderRadius": 5,
      "marginTop": 0,
      "marginRight": 0,
      "marginBottom": 0,
      "marginLeft": 0,
      "paddingTop": 8,
      "paddingRight": 8,
      "paddingBottom": 8,
      "paddingLeft": 8,
      "backgroundColor": "#FFFFFF",
      "cursor": "pointer"
    }
  }
  
  function createButtonStyle (fontSize: number) {
    return {
      "fontFamily": "Arial",
      "fontStyle": "normal",
      "fontSize": fontSize,
      "fontWeight": 400,
      "justifyContent": "left",
      "color": '#000000',
      "borderColor": '#dedede',
      "borderWidth": 1,
      "borderStyle": "Solid",
      "borderRadius": 5,
      "marginTop": 0,
      "marginRight": 0,
      "marginBottom": 0,
      "marginLeft": 0,
      "paddingTop": 8,
      "paddingRight": 8,
      "paddingBottom": 8,
      "paddingLeft": 8,
      "backgroundColor": "#FFFFFF",
    }
  }

const initialState = {
    properties: {
      heading: createDefaultStyle(24),
      options: createOptionStyle(),
      submitBtn: createButtonStyle(18),
      prevBtn: createButtonStyle(18),
      OptionHoverStyle: createOptionStyle(),
      SelectedOptionStyle: createOptionStyle(),
      ButtonHoverStyle: {
        NextButtonText: "Next",
        NextButtonHoverColor: "#dedede",
        NextButtonHoverTextColor: "#000000",
        SubmitButtonText: "Submit",
        PreviousButtonText: "Prev",
        PreviousButtonHoverColor: "#dedede",
        PreviousButtonHoverTextColor: "#000000",
      }
  }
}

export const sharedSlice = createSlice({
    name: "shared",
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

export {createButtonStyle, createDefaultStyle, createOptionStyle}

export type {SharedPropertyRemove, SharedPropertyUpdate}

export const {updateProperty, addProperty, removeProperty, resetProperties, initializeProperties} = sharedSlice.actions;

export default sharedSlice.reducer;