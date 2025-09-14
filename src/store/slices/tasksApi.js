import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: (result) =>
        result
          ? [
              ...result.map((t) => ({ type: "Tasks", id: t._id })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    createTask: builder.mutation({
      query: (body) => ({ url: "/tasks", method: "POST", body }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (r, e, { id }) => [{ type: "Tasks", id }],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({ url: `/tasks/${id}`, method: "DELETE" }),
      invalidatesTags: (r, e, id) => [{ type: "Tasks", id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
