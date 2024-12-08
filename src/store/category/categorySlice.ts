import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TCategoryItemSendInfo, TCategorySendInfo } from "../../types/category";

type SliceState = {
  categorySendInfo: TCategorySendInfo;
  categoryItemSendInfo: TCategoryItemSendInfo;
  categoryEmptyValues: string[];
};

const initialState: SliceState = {
  categorySendInfo: {
    offset: 0,
    limit: 20,
  },

  categoryItemSendInfo: {},
  categoryEmptyValues: [],
};

const categorySlice = createSlice({
  name: "categorys",
  initialState,
  reducers: {
    setCategorySendInfo(state, action: PayloadAction<TCategorySendInfo>) {
      state.categorySendInfo = action.payload;
    },
    setCategoryItemSendInfo(
      state,
      action: PayloadAction<TCategoryItemSendInfo>
    ) {
      state.categoryItemSendInfo = action.payload;
    },
    setCategoryEmptyValues(state, action: PayloadAction<string[]>) {
      state.categoryEmptyValues = action.payload;
    },
    resetItemStates(state) {
      state.categoryItemSendInfo = initialState.categoryItemSendInfo;
    },
    resetState() {
      return initialState;
    },

    resetCategoryItemSendInfo(state) {
      state.categoryItemSendInfo = initialState.categoryItemSendInfo;
    },
  },
});

export const {
  setCategorySendInfo,
  setCategoryItemSendInfo,
  setCategoryEmptyValues,
  resetItemStates,
  resetState,
  resetCategoryItemSendInfo,
} = categorySlice.actions;
export default categorySlice.reducer;
