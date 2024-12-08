import { buildUrlWithParams } from "../../funtions";
import { TRowSendInfo } from "../../types/row";
import { setRowItemSendInfo } from "../row/rowSlice";
import { apiSlice } from "./apiSlice";

export const rowApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRows: builder.query({
      query: (params: TRowSendInfo) => {
        return {
          url: buildUrlWithParams("/rows", params),
          method: "GET",
        };
      },
      providesTags: ["Rows"],
    }),

    addRow: builder.mutation({
      query: (params) => {
        return {
          url: "/rows",
          method: "POST",
          body: params,
        };
      },
      invalidatesTags: ["Rows"],
    }),
    editRow: builder.mutation({
      query: (params) => {
        return {
          url: `/rows/${params?.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Rows"],
    }),

    getRow: builder.query({
      query: (id) => {
        return {
          url: `/rows/${id}`,
          method: "GET",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Dispatch an action to update another slice
          dispatch(
            setRowItemSendInfo({
              ...data,
              gardenerId: data?.gardener?.id,
            })
          );
        } catch (error) {
          console.error("Query failed:", error);
        }
      },
      providesTags: ["Rows"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetRowsQuery,
  useAddRowMutation,
  useGetRowQuery,
  useEditRowMutation,
} = rowApi;
