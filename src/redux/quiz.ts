import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Question } from "./question";
import { createDefaultStyle, createButtonStyle, createOptionStyle } from "./shared";

type Quiz = {
    questions: Question[],
    id: number,
    title: string,
    newTitle: string,
    newDescription: string,
    description: string,
    sharedProperties: {},
    presentationProperties: {},
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
                newTitle: "Enter Quiz Name",
                newDescription: "",
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
                },
                presentationProperties: {
                    properties: {
                        background: {
                            "backgroundColor": "#FFFFFF"
                        },
                        heading: createDefaultStyle(24),
                        description: createOptionStyle(),
                        startBtn: createButtonStyle(18),
                        ButtonHoverStyle: {
                            StartButtonText: "Start",
                            StartButtonHoverColor: "#dedede",
                            StartButtonHoverTextColor: "#000000",
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
        updatePresentationProperties(state, action: PayloadAction<PropertiesUpdate>){
            let quizes = state.quizes.filter(quiz => quiz.id == action.payload.quizId);
            if(quizes.length > 0) {
                quizes[0].presentationProperties.properties = action.payload.properties;
            }
        },
        updateQuiz(state, action: PayloadAction<QuizUpdate>) {
            let quizes = state.quizes.filter(quiz => quiz.id == action.payload.quizId);
            if(quizes.length > 0) {
                quizes[0].newTitle = action.payload.title;
                quizes[0].newDescription = action.payload.description;
            }
        },
        saveQuiz(state, action: PayloadAction<number>) {
            let quizes = state.quizes.filter(quiz => quiz.id == action.payload);
            if(quizes.length > 0) {
                quizes[0].title = quizes[0].newTitle;
                quizes[0].description = quizes[0].newDescription;
            }
        },
        deleteQuiz(state, action: PayloadAction<number>) {
            state.quizes = state.quizes.filter(quiz => quiz.id != action.payload);
        },
        resetQuiz(state, action:PayloadAction<number>) {
            let quizes = state.quizes.filter(quiz => quiz.id == action.payload);
            if(quizes.length > 0) {
                quizes[0].newTitle = quizes[0].title;
                quizes[0].newDescription = quizes[0].description;
            }
        }
    }
});

export type {Quiz, QuestionUpdate, PropertiesUpdate, QuizUpdate}

export const {createNewQuiz, updateQuestions, updateProperties, updateQuiz, deleteQuiz, updatePresentationProperties, saveQuiz, resetQuiz} = quizSlice.actions;

export default quizSlice.reducer;