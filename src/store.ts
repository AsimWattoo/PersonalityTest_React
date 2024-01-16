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
import notificationReducer from './redux/notification';
import loserPropertiesReducer from "./redux/loserProperties";
import socialIconsReducer from "./redux/social-icons";
import registrationReducer from "./redux/registration";

const store = configureStore({
    reducer: {
        question: questionReducer,
        shared: sharedReducer,
        quiz: quizReducer,
        presentation: presentationReducer,
        files: fileReducer,
        personality: personalityReducer,
        winner: winnerPropertiesReducer,
        Notification: notificationReducer,
        loser: loserPropertiesReducer,
        socialIcons: socialIconsReducer,
        registration: registrationReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store