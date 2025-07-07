import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/slice";
import { categoriesReducer } from "./categories/slice";
import { filterReducer } from "./filter/slice";
import { transactionsReducer } from "./transactions/slice";
import { userReducer } from "./user/slice";
import { modalReducer } from "./modal/slice";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["accessToken", "refreshToken", "sid", "isLoggedIn"],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    user: userReducer,
    categories: categoriesReducer,
    transactions: transactionsReducer,
    filter: filterReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
