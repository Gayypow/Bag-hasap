import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TTreeItemSendInfo, TTreeSendInfo } from "../../types/tree";

type SliceState = {
  treeSendInfo: TTreeSendInfo;
  treeItemSendInfo: TTreeItemSendInfo;
  treeEmptyValues: string[];
};

const initialState: SliceState = {
  treeSendInfo: {
    offset: 0,
    limit: 20,
  },

  treeItemSendInfo: {},
  treeEmptyValues: [],
};

const treeSlice = createSlice({
  name: "trees",
  initialState,
  reducers: {
    setTreeSendInfo(state, action: PayloadAction<TTreeSendInfo>) {
      state.treeSendInfo = action.payload;
    },
    setTreeItemSendInfo(state, action: PayloadAction<TTreeItemSendInfo>) {
      state.treeItemSendInfo = action.payload;
    },
    setTreeEmptyValues(state, action: PayloadAction<string[]>) {
      state.treeEmptyValues = action.payload;
    },
    resetItemStates(state) {
      state.treeItemSendInfo = initialState.treeItemSendInfo;
    },
    resetState() {
      return initialState;
    },

    resetTreeItemSendInfo(state) {
      state.treeItemSendInfo = initialState.treeItemSendInfo;
    },
  },
});

export const {
  setTreeSendInfo,
  setTreeItemSendInfo,
  setTreeEmptyValues,
  resetItemStates,
  resetState,
  resetTreeItemSendInfo,
} = treeSlice.actions;
export default treeSlice.reducer;
