import * as slices from "src/store/api/slices";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    [slices.newsFeedSlice.reducerPath]: slices.newsFeedSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(slices.newsFeedSlice.middleware),
});

export default store;
