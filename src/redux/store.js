import { configureStore } from "@reduxjs/toolkit";
import walletReducer from "../redux/slice";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfigSession = {
  key: "wallet",
  storage: storageSession,
};

const persistedWalletReducer = persistReducer(persistConfigSession, walletReducer);

const store = configureStore({
  reducer: {
    wallet: persistedWalletReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
