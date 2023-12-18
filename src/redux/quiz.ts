import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "./question";

type Quiz = {
    questions: Question[],
    id: number,
    title: string,
    description: string,
    sharedProperties: {},
    presentationProperties: {},
    winnerPageProperties: {},
    isDraft: true,
}

type QuestionUpdate = {
    questions: Question[],
}

type PropertiesUpdate = {
    properties: {},
}

type QuizUpdate = {
    title: string,
    description: string
}

interface QuizState {
    quiz: Quiz | null,
}

let initialState = {quiz: {}} as QuizState

export const quizSlice = createSlice({
    name: "quiz",
    initialState: initialState,
    reducers: {
        setQuiz(state, action: PayloadAction<Quiz>) {
            state.quiz = action.payload;
        },
        updateQuestions(state, action: PayloadAction<QuestionUpdate>) {
            if(state.quiz != null) {
                state.quiz.questions = action.payload.questions;
            }
        },
        updateProperties(state, action: PayloadAction<PropertiesUpdate>){
            if(state.quiz != null) {
                state.quiz.sharedProperties.properties = action.payload.properties;
            }
        },
        updatePresentationProperties(state, action: PayloadAction<PropertiesUpdate>){
            if(state.quiz != null) {
                state.quiz.presentationProperties.properties = action.payload.properties;
            }
        },
        updateQuiz(state, action: PayloadAction<QuizUpdate>) {
            if(state.quiz != null) {
                state.quiz.title = action.payload.title;
            state.quiz.description = action.payload.description;
            }
        },
        updateWinnerProperties(state, action: PayloadAction<PropertiesUpdate>) {
            if(state.quiz != null) {
                state.quiz.winnerPageProperties.properties = action.payload.properties;
            }
        },
        resetQuiz(state, action) {
            state.quiz = null;
        }
    }
});

export type {Quiz, QuestionUpdate, PropertiesUpdate, QuizUpdate}

export const {updateQuestions, updateProperties, updateQuiz, updatePresentationProperties, updateWinnerProperties, setQuiz, resetQuiz} = quizSlice.actions;

export default quizSlice.reducer;