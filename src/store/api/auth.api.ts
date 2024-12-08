/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    auth: builder.mutation({
      query: (auth) => {
        return {
          url: "/auth/login",
          // mode: 'cors',
          method: "POST",
          body: auth,
        };
      },
    }),
    profile: builder.query({
      query: () => {
        return {
          url: "/auth/profile",
          // mode: 'cors',
          method: "GET",
        };
      },
      transformResponse: async (baseQueryReturnValue) => {
        return (baseQueryReturnValue as any)?.data;
      },
    }),
  }),
  overrideExisting: false,
});

export const { useAuthMutation, useProfileQuery } = authApi;
