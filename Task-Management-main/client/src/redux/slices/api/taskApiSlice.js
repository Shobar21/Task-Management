import { apiSlice } from "../apiSlice";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({ url: "/task/dashboard", method: "GET" }),
      providesTags: ["Dashboard"],
    }),

    // args: { stage: "todo" | "in progress" | "completed" | "", isTrashed: true | false }
    getAllTask: builder.query({
      query: ({ stage = "", isTrashed = false }) => ({
        url: `/task?stage=${encodeURIComponent(stage)}&isTrashed=${
          isTrashed ? "true" : ""
        }`,
        method: "GET",
      }),
      providesTags: ["Tasks"],
    }),

    getSingleTask: builder.query({
      query: (id) => ({ url: `/task/${id}`, method: "GET" }),
      providesTags: ["Task"],
    }),

    createTask: builder.mutation({
      query: (data) => ({ url: "/task/create", method: "POST", body: data }),
      invalidatesTags: ["Tasks", "Dashboard", "Notifications"],
    }),

    updateTask: builder.mutation({
      query: (data) => ({
        url: `/task/update/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks", "Task", "Dashboard"],
    }),

    duplicateTask: builder.mutation({
      query: (id) => ({ url: `/task/duplicate/${id}`, method: "POST", body: {} }),
      invalidatesTags: ["Tasks", "Dashboard", "Notifications"],
    }),

    createSubTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/create-subtask/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks", "Task"],
    }),

    postTaskActivity: builder.mutation({
      query: ({ id, data }) => ({
        url: `/task/activity/${id}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Task", "Tasks"],
    }),

    // moves a task to the trash (does not delete it yet)
    trashTask: builder.mutation({
      query: ({ id }) => ({ url: `/task/${id}`, method: "PUT" }),
      invalidatesTags: ["Tasks", "Dashboard"],
    }),

    // actionType: delete | deleteAll | restore | restoreAll
    deleteRestoreTask: builder.mutation({
      query: ({ id, actionType }) => ({
        url: `/task/delete-restore/${id ?? ""}?actionType=${actionType}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks", "Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllTaskQuery,
  useGetSingleTaskQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDuplicateTaskMutation,
  useCreateSubTaskMutation,
  usePostTaskActivityMutation,
  useTrashTaskMutation,
  useDeleteRestoreTaskMutation,
} = taskApiSlice;
