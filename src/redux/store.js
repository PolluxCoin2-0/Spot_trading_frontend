import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "../redux/slice";

const store = configureStore({
  reducer: {
    wallet: walletReducer,
  },
});

export default store;
