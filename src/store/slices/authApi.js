import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, clearCredentials } from "@/store/slices/authSlice";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken; // ✅ match your slice
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Me"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user && data?.token) {
            dispatch(setCredentials({ user: data.user, accessToken: data.token }));
          }
        } catch {}
      },
    }),

    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user && data?.token) {
            dispatch(setCredentials({ user: data.user, accessToken: data.token }));
          }
        } catch {}
      },
    }),

    logout: builder.mutation({
      query: () => ({ url: "/logout", method: "POST" }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(clearCredentials());
        }
      },
    }),

    me: builder.query({
      query: () => "/me",
      providesTags: ["Me"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.user) {
            dispatch(setCredentials({ user: data.user }));
          } else {
            dispatch(clearCredentials());
          }
        } catch {
          dispatch(clearCredentials());
        }
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
} = authApi;