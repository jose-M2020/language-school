import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from './api/authApi';
import { reservationsApi } from './api/reservationApi';
import { usersApi } from './api/userApi';
import authReducer from "./features/authSlice";

const persistConfig = { 
  key: "root",
  storage,
  version: 1,
  whitelist: ['auth'],
};
const reducers = combineReducers({ 
  [authApi.reducerPath]: authApi.reducer,
  [reservationsApi.reducerPath]: reservationsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      reservationsApi.middleware,
      usersApi.middleware,
      authApi.middleware
    ),
});

setupListeners(store.dispatch);