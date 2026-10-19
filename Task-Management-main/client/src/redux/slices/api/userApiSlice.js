import { apiSlice } from "../apiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeamList: builder.query({
      query: () => ({ url: "/user/get-team", method: "GET" }),
      providesTags: ["Users"],
    }),

    // admin adds a new user
    registerUser: builder.mutation({
      query: (data) => ({ url: "/user/register", method: "POST", body: data }),
      invalidatesTags: ["Users", "Dashboard"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({ url: "/user/profile", method: "PUT", body: data }),
      invalidatesTags: ["Users", "Dashboard"],
    }),

    changePassword: builder.mutation({
      query: (data) => ({
        url: "/user/change-password",
        method: "PUT",
        body: data,
      }),
    }),

    // activate / deactivate
    userAction: builder.mutation({
      query: ({ id, isActive }) => ({
        url: `/user/${id}`,
        method: "PUT",
        body: { isActive },
      }),
      invalidatesTags: ["Users", "Dashboard"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({ url: `/user/${id}`, method: "DELETE" }),
      invalidatesTags: ["Users", "Dashboard"],
    }),

    getNotifications: builder.query({
      query: () => ({ url: "/user/notifications", method: "GET" }),
      providesTags: ["Notifications"],
    }),

    markNotiAsRead: builder.mutation({
      query: (data) => ({
        url: `/user/read-noti?isReadType=${data.type}&id=${data?.id ?? ""}`,
        method: "PUT",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetTeamListQuery,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useUserActionMutation,
  useDeleteUserMutation,
  useGetNotificationsQuery,
  useMarkNotiAsReadMutation,
} = userApiSlice;
