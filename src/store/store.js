// Configure Redux store with RTK Query 'tasksApi' and an auth slice
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tasksApi } from "./slices/tasksApi";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

setupListeners(store.dispatch);