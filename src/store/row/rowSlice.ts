import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TRowItemSendInfo, TRowSendInfo } from "../../types/row";

type SliceState = {
  rowSendInfo: TRowSendInfo;
  rowItemSendInfo: TRowItemSendInfo;
  rowEmptyValues: string[];
};

const initialState: SliceState = {
  rowSendInfo: {
    offset: 0,
    limit: 20,
  },

  rowItemSendInfo: {},
  rowEmptyValues: [],
};

const rowSlice = createSlice({
  name: "rows",
  initialState,
  reducers: {
    setRowSendInfo(state, action: PayloadAction<TRowSendInfo>) {
      state.rowSendInfo = action.payload;
    },
    setRowItemSendInfo(state, action: PayloadAction<TRowItemSendInfo>) {
      state.rowItemSendInfo = action.payload;
    },
    setRowEmptyValues(state, action: PayloadAction<string[]>) {
      state.rowEmptyValues = action.payload;
    },
    resetItemStates(state) {
      state.rowItemSendInfo = initialState.rowItemSendInfo;
    },
    resetState() {
      return initialState;
    },

    resetRowItemSendInfo(state) {
      state.rowItemSendInfo = initialState.rowItemSendInfo;
    },
  },
});

export const {
  setRowSendInfo,
  setRowItemSendInfo,
  setRowEmptyValues,
  resetItemStates,
  resetState,
  resetRowItemSendInfo,
} = rowSlice.actions;
export default rowSlice.reducer;
