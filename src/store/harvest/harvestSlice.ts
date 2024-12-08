import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { THarvestItemSendInfo, THarvestSendInfo } from "../../types/harvest";

type SliceState = {
  harvestSendInfo: THarvestSendInfo;
  harvestItemSendInfo: THarvestItemSendInfo;
  harvestEmptyValues: string[];
};

const initialState: SliceState = {
  harvestSendInfo: {
    offset: 0,
    limit: 20,
  },

  harvestItemSendInfo: {},
  harvestEmptyValues: [],
};

const harvestSlice = createSlice({
  name: "harvests",
  initialState,
  reducers: {
    setHarvestSendInfo(state, action: PayloadAction<THarvestSendInfo>) {
      state.harvestSendInfo = action.payload;
    },
    setHarvestItemSendInfo(state, action: PayloadAction<THarvestItemSendInfo>) {
      state.harvestItemSendInfo = action.payload;
    },
    setHarvestEmptyValues(state, action: PayloadAction<string[]>) {
      state.harvestEmptyValues = action.payload;
    },
    resetItemStates(state) {
      state.harvestItemSendInfo = initialState.harvestItemSendInfo;
    },
    resetState() {
      return initialState;
    },

    resetHarvestItemSendInfo(state) {
      state.harvestItemSendInfo = initialState.harvestItemSendInfo;
    },
  },
});

export const {
  setHarvestSendInfo,
  setHarvestItemSendInfo,
  setHarvestEmptyValues,
  resetItemStates,
  resetState,
  resetHarvestItemSendInfo,
} = harvestSlice.actions;
export default harvestSlice.reducer;
