import { apiSlice } from "./apiSlice";

export const statApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => {
        return {
          url: "/stats",
          method: "GET",
        };
      },
      providesTags: ["Stats"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetStatsQuery } = statApi;
