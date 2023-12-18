import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./redux/question";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sharedReducer from './redux/shared';
import quizReducer from "./redux/quiz";
import presentationReducer from "./redux/presentationProperties";
import fileReducer from "./redux/files";
import personalityReducer from './redux/personality';
import winnerPropertiesReducer from './redux/winnerProperties';

const store = configureStore({
    reducer: {
        question: questionReducer,
        shared: sharedReducer,
        quiz: quizReducer,
        presentation: presentationReducer,
        files: fileReducer,
        personality: personalityReducer,
        winner: winnerPropertiesReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store