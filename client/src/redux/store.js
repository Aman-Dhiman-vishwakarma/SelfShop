import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import quantitySlice from "./quantitySlice";
import cartSlice from "./cartSlice";
import addressSlice from "./addressSlice";
import orderSlice from "./orderSlice";
import sectionFilterSlice from "./sectionFilterSlice";
import adminSlice from "./adminSlice";
import slidesSlice from "./slideSlice";
import sectionsSlice from "./sectionsSlice";

const rootReducer = combineReducers({
    product:productSlice.reducer,
    auth:authSlice.reducer,
    quantity:quantitySlice.reducer,
    cart:cartSlice.reducer,
    address:addressSlice.reducer,
    order:orderSlice.reducer,
    sectionfilter:sectionFilterSlice.reducer,
    admin:adminSlice.reducer,
    slides:slidesSlice.reducer,
    sections:sectionsSlice.reducer
  });

const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
  

export default store;
export const persistor = persistStore(store);