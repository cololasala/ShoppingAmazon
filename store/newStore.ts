import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";
import AuthSlice from "./slices/authSlice";
import CartSlice from "./slices/cartSlice";
import ShippedCountSlice from "./slices/shippedCountSlice";

const rootReducer = combineReducers({
  Auth: AuthSlice, // not persisted
  ShippedCount: ShippedCountSlice, // not persisted
  Cart: CartSlice, // persisted
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whiteList: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
