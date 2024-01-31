import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StatsState {
    startTime: String,
    personality: String,
    isExternalLinkClicked: boolean
}

let initialState = {} as StatsState

export const statsSlice = createSlice({
    name: "Stats",
    initialState: initialState,
    reducers: {
        setStartTime(state, action: PayloadAction<Date>) {
            state.startTime = action.payload.toISOString();
        },
        setPersonality(state, action: PayloadAction<String>) {
            state.personality = action.payload;
        },
        setExternalLinkClicked(state, action) {
            state.isExternalLinkClicked = true;
        },
        resetStats(state, action) {
            state.startTime = (new Date()).toISOString();
            state.personality = "";
            state.isExternalLinkClicked = false;
        }
    }
});

export const {setStartTime, setPersonality, resetStats, setExternalLinkClicked} = statsSlice.actions;

export default statsSlice.reducer;