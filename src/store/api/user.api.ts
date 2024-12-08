import { buildUrlWithParams } from "../../funtions";
import { TUserSendInfo } from "../../types/user";
import { setUserItemSendInfo } from "../user/userSlice";
import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params: TUserSendInfo) => {
        return {
          url: buildUrlWithParams("/users", params),
          method: "GET",
        };
      },
      providesTags: ["Users"],
    }),

    addUser: builder.mutation({
      query: (params) => {
        return {
          url: "/users",
          method: "POST",
          body: params,
        };
      },
      invalidatesTags: ["Users"],
    }),
    editUser: builder.mutation({
      query: (params) => {
        return {
          url: `/users/${params?.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Users"],
    }),

    getUser: builder.query({
      query: (id) => {
        return {
          url: `/users/${id}`,
          method: "GET",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Dispatch an action to update another slice
          dispatch(setUserItemSendInfo(data));
        } catch (error) {
          console.error("Query failed:", error);
        }
      },
      providesTags: ["Users"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useGetUserQuery,
  useEditUserMutation,
} = userApi;
