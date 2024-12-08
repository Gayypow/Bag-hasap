import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./auth/authSlice";
import generalSlice from "./general/generalSlice";
import userSlice from "./user/userSlice";
import rowSlice from "./row/rowSlice";
import irrigationSlice from "./irrigation/irrigationSlice";
import categorySlice from "./category/categorySlice";
import treeSlice from "./tree/treeSlice";
import harvestSlice from "./harvest/harvestSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    general: generalSlice,
    user: userSlice,
    row: rowSlice,
    irrigation: irrigationSlice,
    category: categorySlice,
    tree: treeSlice,
    harvest: harvestSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      apiSlice.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
