import { buildUrlWithParams } from "../../funtions";
import { TTreeSendInfo } from "../../types/tree";
import { setTreeItemSendInfo } from "../tree/treeSlice";
import { apiSlice } from "./apiSlice";

export const treeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrees: builder.query({
      query: (params: TTreeSendInfo) => {
        return {
          url: buildUrlWithParams("/trees", params),
          method: "GET",
        };
      },
      providesTags: ["Trees"],
    }),

    addTree: builder.mutation({
      query: (params) => {
        return {
          url: "/trees",
          method: "POST",
          body: params,
        };
      },
      invalidatesTags: ["Trees"],
    }),
    editTree: builder.mutation({
      query: (params) => {
        return {
          url: `/trees/${params?.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Trees"],
    }),

    getTree: builder.query({
      query: (id) => {
        return {
          url: `/trees/${id}`,
          method: "GET",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Dispatch an action to update another slice
          dispatch(
            setTreeItemSendInfo({
              ...data,
              gardenerId: data?.gardener?.id,
            })
          );
        } catch (error) {
          console.error("Query failed:", error);
        }
      },
      providesTags: ["Trees"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTreesQuery,
  useAddTreeMutation,
  useGetTreeQuery,
  useEditTreeMutation,
} = treeApi;
