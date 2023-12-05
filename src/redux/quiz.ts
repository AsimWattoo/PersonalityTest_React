import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "./question";
import { createDefaultStyle, createButtonStyle, createOptionStyle } from "./shared";

type Quiz = {
    questions: Question[],
    id: number,
    title: string,
    description: string,
    sharedProperties: {}
}

type QuestionUpdate = {
    questions: Question[],
    quizId: number
}

type PropertiesUpdate = {
    properties: {},
    quizId: number
}

type QuizUpdate = {
    quizId: number,
    title: string,
    description: string
}

interface QuizState {
    quizes: Quiz[],
    lastId: number
}

let initialState = {quizes: [], lastId: 0} as QuizState

export const quizSlice = createSlice({
    name: "quiz",
    initialState: initialState,
    reducers: {
        createNewQuiz(state, action) {
            state.quizes.push({
                id: state.lastId + 1,
                questions: [], 
                title: "Enter Quiz Name", 
                description: "", 
                sharedProperties: {
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
            });
            state.lastId += 1
        },
        updateQuestions(state, action: PayloadAction<QuestionUpdate>) {
            let quizes = state.quizes.filter(quiz => quiz.id == action.payload.quizId);
            if(quizes.length > 0) {
                quizes[0].questions = action.payload.questions;
            }
        },
        updateProperties(state, action: PayloadAction<PropertiesUpdate>){
            let quizes = state.quizes.filter(quiz => quiz.id == action.payload.quizId);
            if(quizes.length > 0) {
                quizes[0].sharedProperties.properties = action.payload.properties;
            }
        },
        updateQuiz(state, action: PayloadAction<QuizUpdate>) {
            let quizes = state.quizes.filter(quiz => quiz.id == action.payload.quizId);
            if(quizes.length > 0) {
                quizes[0].title = action.payload.title;
                quizes[0].description = action.payload.description;
            }
        },
        deleteQuiz(state, action: PayloadAction<number>) {
            state.quizes = state.quizes.filter(quiz => quiz.id != action.payload);
        }
    }
});

export type {Quiz, QuestionUpdate, PropertiesUpdate, QuizUpdate}

export const {createNewQuiz, updateQuestions, updateProperties, updateQuiz, deleteQuiz} = quizSlice.actions;

export default quizSlice.reducer;