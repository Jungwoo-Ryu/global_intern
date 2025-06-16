// src/store.ts
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import authReducer from './reducers/authReducer';
import type {AuthState} from './types/auth';

export interface RootState {
    auth: AuthState;
}

// Persist 설정
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'] // auth 상태만 persist
};

const rootReducer = combineReducers({
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
