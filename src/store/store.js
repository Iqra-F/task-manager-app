import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { tasksApi } from "./slices/tasksApi";
import { authApi } from "./slices/authApi";
import authReducer from "./slices/authSlice";
import themeReducer from './slices/themeSlice';
export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tasksApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);
