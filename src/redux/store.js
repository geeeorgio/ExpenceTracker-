import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";
import { transactionsReducer } from "./transactions/slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
  },
});

export { store };
