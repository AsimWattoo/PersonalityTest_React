import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RegistrationQuestion = {
    id: string,
    text: string,
}

type RegistrationQuestionUpdate = {
    index: number,
    id: string,
    text: string,
}

interface RegistrationState {
    questions: RegistrationQuestion[] | null
}

let initialState = {questions: []} as RegistrationState;

export const registrationSlice = createSlice({
    name: "registration",
    initialState: initialState,
    reducers: {
        setQuestions(state, action: PayloadAction<RegistrationQuestion[]>) {
            state.questions = action.payload;
        },
        resetQuestions(state, action) {
            state.questions = null;
        },
        addQuestion(state, action: PayloadAction<RegistrationQuestion>) {
            state.questions?.push(action.payload);
        },
        updateQuestion(state, action: PayloadAction<RegistrationQuestionUpdate>) {
            if(state.questions) {
                state.questions[action.payload.index].id = action.payload.id;
                state.questions[action.payload.index].text = action.payload.text;
            }
        },
        deleteQuestion(state, action: PayloadAction<number>) {
            if(state.questions) {
                state.questions = state.questions.filter((q, index) => index != action.payload);
            }
        }
    }
});

export type {RegistrationQuestion, RegistrationQuestionUpdate};

export const {setQuestions, resetQuestions, addQuestion, updateQuestion, deleteQuestion} = registrationSlice.actions;

export default registrationSlice.reducer;