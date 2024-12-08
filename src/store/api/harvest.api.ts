import { buildUrlWithParams } from "../../funtions";
import { THarvestSendInfo } from "../../types/harvest";
import { setHarvestItemSendInfo } from "../harvest/harvestSlice";
import { apiSlice } from "./apiSlice";

export const harvestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHarvests: builder.query({
      query: (params: THarvestSendInfo) => {
        return {
          url: buildUrlWithParams("/harvests", params),
          method: "GET",
        };
      },
      providesTags: ["Harvests"],
    }),

    addHarvest: builder.mutation({
      query: (params) => {
        return {
          url: "/harvests",
          method: "POST",
          body: params,
        };
      },
      invalidatesTags: ["Harvests"],
    }),
    editHarvest: builder.mutation({
      query: (params) => {
        return {
          url: `/harvests/${params?.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Harvests"],
    }),

    getHarvest: builder.query({
      query: (id) => {
        return {
          url: `/harvests/${id}`,
          method: "GET",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Dispatch an action to update another slice
          dispatch(
            setHarvestItemSendInfo({
              ...data,
              gardenerId: data?.gardener?.id,
            })
          );
        } catch (error) {
          console.error("Query failed:", error);
        }
      },
      providesTags: ["Harvests"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHarvestsQuery,
  useAddHarvestMutation,
  useGetHarvestQuery,
  useEditHarvestMutation,
} = harvestApi;
