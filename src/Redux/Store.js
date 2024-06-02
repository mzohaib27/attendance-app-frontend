import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthSlice from "./AuthSlice.js";

const persistConfig = {
  key: "root",
  storage,
  // whitelist: ["Auth"],
};

const perSistReducer = persistReducer(persistConfig, AuthSlice);

export const store = configureStore({
  reducer: {
    auth: perSistReducer,
  },
});

export const persistor = persistStore(store);
