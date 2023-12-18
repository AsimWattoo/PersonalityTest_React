import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Accordion } from "reactstrap";

type PersonalityUpdate = {
    index: number,
    editName: string,
    editDescription: string
}

type PersonalityIdUpdate = {
    index: number,
    id: string
}

type Personality = {
    _id: string,
    name: string,
    editName: string,
    description: string,
    editDescription: string,
    editable: boolean,
    isSaved: boolean
}

interface PersonalityState {
    personalities: Personality[]
}

let initialState = {personalities: []} as PersonalityState;

export const personalitySlice = createSlice({
    name: "personality",
    initialState: initialState,
    reducers: {
        setPersonalities: (state, action: PayloadAction<Personality[]>) => {
            state.personalities = action.payload;
        },
        createPersonality: (state, action: PayloadAction<Personality>) => {
            state.personalities.push(action.payload);
        },
        savePersonality: (state, action: PayloadAction<number>) => {
            state.personalities[action.payload].name = state.personalities[action.payload].editName;
            state.personalities[action.payload].description = state.personalities[action.payload].editDescription;
            state.personalities[action.payload].isSaved = true;
            state.personalities[action.payload].editable = false;
        },
        cancelPersonality: (state, action: PayloadAction<number>) => {
            if(state.personalities[action.payload].isSaved) {
                state.personalities[action.payload].editName = state.personalities[action.payload].name;
                state.personalities[action.payload].editDescription = state.personalities[action.payload].description;
                state.personalities[action.payload].editable = false;
            } else {
                state.personalities = state.personalities.filter((p, i) => i != action.payload);
            }
        },
        deletePersonality: (state, action: PayloadAction<number>) => {
            state.personalities = state.personalities.filter((p, i) => i != action.payload);
        },
        editPersonality: (state, action: PayloadAction<number>) => {
            state.personalities[action.payload].editable = true;
            state.personalities[action.payload].editName = state.personalities[action.payload].name;
            state.personalities[action.payload].editDescription = state.personalities[action.payload].description;
        },
        updatePersonality: (state, action: PayloadAction<PersonalityUpdate>) => {
            state.personalities[action.payload.index].editName = action.payload.editName;
            state.personalities[action.payload.index].editDescription = action.payload.editDescription;
        },
        setId: (state, action: PayloadAction<PersonalityIdUpdate>) => {
            state.personalities[action.payload.index]._id = action.payload.id;
        }
    }
})

export type {Personality, PersonalityUpdate}

export const {createPersonality, savePersonality, cancelPersonality, deletePersonality, editPersonality, updatePersonality, setId, setPersonalities} = personalitySlice.actions;

export default personalitySlice.reducer;