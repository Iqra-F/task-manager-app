// RTK Query API for tasks. Using credentials: 'include' so httpOnly cookie is sent automatically.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    // include cookies in requests -> our httpOnly cookie will be sent
    credentials: "include",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => "/tasks",
      providesTags: (result) =>
        result
          ? [
              ...result.map((task) => ({ type: "Tasks", id: task._id })),
              { type: "Tasks", id: "LIST" },
            ]
          : [{ type: "Tasks", id: "LIST" }],
    }),
    createTask: builder.mutation({
      query: (body) => ({ url: "/tasks", method: "POST", body }),
      invalidatesTags: [{ type: "Tasks", id: "LIST" }],
    }),
    updateTask: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/tasks/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [{ type: "Tasks", id }],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({ url: `/tasks/${id}`, method: "DELETE`" }),
      invalidatesTags: (result, error, id) => [{ type: "Tasks", id }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;