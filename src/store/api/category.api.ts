import { buildUrlWithParams } from "../../funtions";
import { TCategorySendInfo } from "../../types/category";
import { setCategoryItemSendInfo } from "../category/categorySlice";
import { apiSlice } from "./apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategorys: builder.query({
      query: (params: TCategorySendInfo) => {
        return {
          url: buildUrlWithParams("/categories", params),
          method: "GET",
        };
      },
      providesTags: ["Categorys"],
    }),

    addCategory: builder.mutation({
      query: (params) => {
        return {
          url: "/categories",
          method: "POST",
          body: params,
        };
      },
      invalidatesTags: ["Categorys"],
    }),
    editCategory: builder.mutation({
      query: (params) => {
        return {
          url: `/categories/${params?.id}`,
          method: "PUT",
          body: params.data,
        };
      },
      invalidatesTags: ["Categorys"],
    }),

    getCategory: builder.query({
      query: (id) => {
        return {
          url: `/categories/${id}`,
          method: "GET",
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          // Dispatch an action to update another slice
          dispatch(
            setCategoryItemSendInfo({
              ...data,
              gardenerId: data?.gardener?.id,
            })
          );
        } catch (error) {
          console.error("Query failed:", error);
        }
      },
      providesTags: ["Categorys"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategorysQuery,
  useAddCategoryMutation,
  useGetCategoryQuery,
  useEditCategoryMutation,
} = categoryApi;
