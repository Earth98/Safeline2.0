import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import createIdbStorage from 'redux-persist-indexeddb-storage';
import safelineReducer from "./Slice/User"
import SignalReducer from "./Slice/SignlaR"
import StateReducer from "./Slice/State"

// Configure IndexedDB storage
const idbStorage = createIdbStorage({ name: 'safeline-db', storeName: 'redux-store' });

const persistConfig = {
    key: 'root',
    storage: idbStorage,
    whitelist: ['Safeline'], // add your slice names here
};

const rootReducer = combineReducers({
    Safeline: safelineReducer,
    SignalR: SignalReducer,
    SafelineState: StateReducer,
    // add more reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // IndexedDB storage may cause non-serializable warnings
        }),
});

export const persistor = persistStore(store);