import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from "@reduxjs/toolkit";

type Option = {
    text: string,
    value: number,
    personalityId: string,
    selected: boolean
}

type Question = {
    _id: string,
    quizId: string,
    heading: string,
    options: Option[],
    properties: {}
}

type HeadingUpdate = {
    heading: string,
    index: number
}

type OptionAdd = {
    questionIndex: number,
    option: Option
}

type OptionUpdate = {
    questionIndex: number,
    optionIndex: number,
    option: Option
}

type PropertyUpdate = {
    questionId: number,
    propertySection: string,
    propertyName: string,
    value: number | string
}

type PropertyRemove = {
    questionId: number,
    propertySection: string,
    propertyNames: string[]
}

type OptionSelection = {
    questionId: number,
    optionId: number
}

interface QuestionState {
    questions: Question[]
}

const initialState = {questions: []} as QuestionState;

export const questionSlice = createSlice({
    name: "questions",
    initialState: initialState,
    reducers: {
        setQuestions: (state, action: PayloadAction<Question[]>) => {
            state.questions = action.payload;
        },
        resetQuestions: (state, action) => {
            state.questions = [];
        },
        selectOption: (state, action: PayloadAction<OptionSelection>) => {
            let payload = action.payload
            state.questions[payload.questionId].options.forEach((option, index) => {
                if(index == payload.optionId)
                    option.selected = true;
                else 
                    option.selected = false;
            });
        },
        resetSelection: (state, action) => {
            for(let question of state.questions) {
                question.options.forEach((option, index) => {
                    option.selected = false;
                });
            }
        },
        addQuestion: (state, action: PayloadAction<Question>) => {
            state.questions.push(action.payload)
        },
        removeQuestion: (state, action: PayloadAction<number>) => {
            state.questions = state.questions.filter((question, index) => index != action.payload)
        },
        updateHeading: (state, action: PayloadAction<HeadingUpdate>) => {
            state.questions[action.payload.index].heading = action.payload.heading;
        },
        addOption: (state, action: PayloadAction<OptionAdd>) => {
            state.questions[action.payload.questionIndex].options.push(action.payload.option);
        },
        updateOption: (state, action: PayloadAction<OptionUpdate>) => {
            state.questions[action.payload.questionIndex].options[action.payload.optionIndex] = action.payload.option;
        },
        removeOption: (state, action: PayloadAction<OptionUpdate>) => {
            state.questions[action.payload.questionIndex].options = state.questions[action.payload.questionIndex].options.filter((option, index) => index != action.payload.optionIndex)
        },
        updateProperty: (state, action: PayloadAction<PropertyUpdate>) => {
            let payload = action.payload;
            state.questions[payload.questionId].properties[payload.propertySection][payload.propertyName] = payload.value;
        },
        addProperty: (state, action: PayloadAction<PropertyUpdate>) => {
            let payload = action.payload;
            state.questions[payload.questionId].properties[payload.propertySection][payload.propertyName] = payload.value;
        },
        removeProperty: (state, action: PayloadAction<PropertyRemove>) => {
            let payload = action.payload;
            for(let propertyName of payload.propertyNames) {
                delete state.questions[payload.questionId].properties[payload.propertySection][propertyName]
            }
        },
    }
});

export type {Question, Option, HeadingUpdate, OptionAdd, OptionUpdate, PropertyUpdate, PropertyRemove, OptionSelection}

export const {
    addQuestion, 
    removeQuestion, 
    updateHeading, 
    addOption, 
    removeOption, 
    updateOption, 
    updateProperty, 
    addProperty, 
    removeProperty, 
    resetQuestions,
    resetSelection,
    selectOption,
    setQuestions} = questionSlice.actions;

export default questionSlice.reducer