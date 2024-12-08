import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  TIrrigationItemSendInfo,
  TIrrigationSendInfo,
} from "../../types/irrigation";

type SliceState = {
  irrigationSendInfo: TIrrigationSendInfo;
  irrigationItemSendInfo: TIrrigationItemSendInfo;
  irrigationEmptyValues: string[];
};

const initialState: SliceState = {
  irrigationSendInfo: {
    offset: 0,
    limit: 20,
  },

  irrigationItemSendInfo: {},
  irrigationEmptyValues: [],
};

const irrigationSlice = createSlice({
  name: "irrigations",
  initialState,
  reducers: {
    setIrrigationSendInfo(state, action: PayloadAction<TIrrigationSendInfo>) {
      state.irrigationSendInfo = action.payload;
    },
    setIrrigationItemSendInfo(
      state,
      action: PayloadAction<TIrrigationItemSendInfo>
    ) {
      state.irrigationItemSendInfo = action.payload;
    },
    setIrrigationEmptyValues(state, action: PayloadAction<string[]>) {
      state.irrigationEmptyValues = action.payload;
    },
    resetItemStates(state) {
      state.irrigationItemSendInfo = initialState.irrigationItemSendInfo;
    },
    resetState() {
      return initialState;
    },

    resetIrrigationItemSendInfo(state) {
      state.irrigationItemSendInfo = initialState.irrigationItemSendInfo;
    },
  },
});

export const {
  setIrrigationSendInfo,
  setIrrigationItemSendInfo,
  setIrrigationEmptyValues,
  resetItemStates,
  resetState,
  resetIrrigationItemSendInfo,
} = irrigationSlice.actions;
export default irrigationSlice.reducer;
