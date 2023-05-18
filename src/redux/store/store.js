import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/authUser";
import productReducer from "../features/productApi";

export default configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
