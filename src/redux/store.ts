import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";

// ...

export const storeRedux = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
