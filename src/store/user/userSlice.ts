import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TUserItemSendInfo, TUserSendInfo } from "../../types/user";

type SliceState = {
  userSendInfo: TUserSendInfo;
  userItemSendInfo: TUserItemSendInfo;
  userEmptyValues: string[];
};

const initialState: SliceState = {
  userSendInfo: {
    offset: 0,
    limit: 20,
  },

  userItemSendInfo: {},
  userEmptyValues: [],
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserSendInfo(state, action: PayloadAction<TUserSendInfo>) {
      state.userSendInfo = action.payload;
    },
    setUserItemSendInfo(state, action: PayloadAction<TUserItemSendInfo>) {
      state.userItemSendInfo = action.payload;
    },
    setUserEmptyValues(state, action: PayloadAction<string[]>) {
      state.userEmptyValues = action.payload;
    },
    resetItemStates(state) {
      state.userItemSendInfo = initialState.userItemSendInfo;
    },
    resetState() {
      return initialState;
    },

    resetUserItemSendInfo(state) {
      state.userItemSendInfo = initialState.userItemSendInfo;
    },
  },
});

export const {
  setUserSendInfo,
  setUserItemSendInfo,
  setUserEmptyValues,
  resetItemStates,
  resetState,
  resetUserItemSendInfo,
} = userSlice.actions;
export default userSlice.reducer;
