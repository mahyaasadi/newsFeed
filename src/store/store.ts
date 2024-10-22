import { configureStore } from "@reduxjs/toolkit";
import * as slices from "../store/api/slices";

const store = configureStore({
  reducer: {
    [slices.newsFeedSlice.reducerPath]: slices.newsFeedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(slices.newsFeedSlice.middleware),
});

export default store;
