import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./redux/question";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sharedReducer from './redux/shared';
import quizReducer from "./redux/quiz";
import presentationReducer from "./redux/presentationProperties";
import fileReducer from "./redux/files";

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, questionReducer)
const persistedSharedReducer = persistReducer(persistConfig, sharedReducer)
const persistedQuizReducer = persistReducer(persistConfig, quizReducer)
const persistedPresentationReducer = persistReducer(persistConfig, presentationReducer)

const store = configureStore({
    reducer: {
        question: questionReducer,
        shared: sharedReducer,
        quiz: quizReducer,
        presentation: presentationReducer,
        files: fileReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store