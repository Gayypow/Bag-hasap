/* eslint-disable @typescript-eslint/no-explicit-any */
import { buildUrlWithParams } from "../../funtions";
import { TIrrigationSendInfo } from "../../types/irrigation";
import { setIrrigationItemSendInfo } from "../irrigation/irrigationSlice";
import { apiSlice } from "./apiSlice";

export const irrigationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getIrrigations: builder.query({
      query: (params: TIrrigationSendInfo) => {
        return {
          url: buildUrlWithParams("/irrigations", params),
          method: "GET",
        };
      },
      providesTags: ["Irrigations"],
    }),

    addIrrigation: builder.mutation({
      query: (params) => {
        return {
          url: "/irrigations",
          method: "POST",
          body: params,
        };
      },
      invalidatesTags: ["Irrigations"],
    }),
    editIrrigation: builder.mutation({
      query: (params) => {
        return {
          url: `/irrigations/${params?.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Irrigations"],
    }),

    getIrrigation: builder.query({
      query: (id) => {
        return {
          url: `/irrigations/${id}`,
          method: "GET",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Dispatch an action to update another slice
          dispatch(
            setIrrigationItemSendInfo({
              ...data,
              rowIds: data?.rows?.map((e: any) => e?.id),
            })
          );
        } catch (error) {
          console.error("Query failed:", error);
        }
      },
      providesTags: ["Irrigations"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetIrrigationsQuery,
  useAddIrrigationMutation,
  useGetIrrigationQuery,
  useEditIrrigationMutation,
} = irrigationApi;
