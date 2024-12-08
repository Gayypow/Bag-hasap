/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { EThemeEnum, TThemePropsType } from "../../types/themePropsType";

type SliceState = {
  appCustomization: TThemePropsType;
  language: string;
  breadcrumbs: { title?: any; path?: string; icon?: JSX.Element }[];
  tableSearchValue: string;
  localSendState: any;
  insideFilters: any;
  isModalComponentOpen: boolean;
  modalComponentTitle: string;
  isMinimized: boolean;
  isSidebarOpen: boolean;
  modalComponentType: string;
};

let defaultTheme = EThemeEnum.DEFAULT;
if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  defaultTheme = EThemeEnum.DARK;
}

const initialState: SliceState = {
  appCustomization: {
    theme: defaultTheme,
    fontSize: 14,
    borderRadius: 3,
    cellPaddingBlock: 6,
    cellPaddingInline: 8,
    primaryColor: "#2e7d32",
  },
  language: localStorage.getItem("I18N_LANGUAGE") ?? "en",
  breadcrumbs: [],
  tableSearchValue: "",
  localSendState: {},
  insideFilters: [],
  isModalComponentOpen: false,
  isSidebarOpen: true,
  modalComponentTitle: "",
  isMinimized: false,
  modalComponentType: "",
};

const generalSlice = createSlice({
  name: "general",
  initialState,
  reducers: {
    setAppCustomization(state, action: PayloadAction<TThemePropsType>) {
      state.appCustomization = { ...state.appCustomization, ...action.payload };
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    setBreadcrumbs(
      state,
      action: PayloadAction<
        { title?: any; path?: string; icon?: JSX.Element }[]
      >
    ) {
      state.breadcrumbs = action.payload;
    },
    setTableSearchValue(state, action: PayloadAction<string>) {
      state.tableSearchValue = action.payload;
    },
    setLocalSendState(state, action: PayloadAction<any>) {
      state.localSendState = action.payload;
    },
    setInsideFilters(state, action: PayloadAction<any>) {
      state.insideFilters = action.payload;
    },
    setIsModalComponentOpen(state, action: PayloadAction<boolean>) {
      state.isModalComponentOpen = action.payload;
    },
    setModalComponentTitle(state, action: PayloadAction<string>) {
      state.modalComponentTitle = action.payload;
    },
    setIsMinimized(state, action: PayloadAction<boolean>) {
      state.isMinimized = action.payload;
    },
    setIsSidebarOpen(state, action: PayloadAction<boolean>) {
      state.isSidebarOpen = action.payload;
    },
    setModalComponentType(state, action: PayloadAction<string>) {
      state.modalComponentType = action.payload;
    },
  },
});

export const {
  setAppCustomization,
  setLanguage,
  setBreadcrumbs,
  setTableSearchValue,
  setLocalSendState,
  setInsideFilters,
  setIsModalComponentOpen,
  setModalComponentTitle,
  setIsMinimized,
  setModalComponentType,
  setIsSidebarOpen,
} = generalSlice.actions;
export default generalSlice.reducer;
