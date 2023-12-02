import { configureStore } from "@reduxjs/toolkit";
import questionReducer from "./redux/question";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sharedReducer from './redux/shared';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, questionReducer)
const persistedSharedReducer = persistReducer(persistConfig, sharedReducer)

const store = configureStore({
    reducer: {
        question: persistedReducer,
        shared: persistedSharedReducer
    }
})

let persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
export {persistor}