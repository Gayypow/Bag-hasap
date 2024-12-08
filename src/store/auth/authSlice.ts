import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { TUser } from "../../types/user";

type SliceState = {
  isAuthenticated: boolean;
  token: string;
  user: TUser;
};

const initialState: SliceState = {
  isAuthenticated: false,
  token: localStorage.getItem("dr_accessToken") || "",
  user: JSON.parse(localStorage.getItem("user") ?? "{}"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },

    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
  },
});

export const { setAuth, setToken, setUser } = authSlice.actions;
export default authSlice.reducer;
