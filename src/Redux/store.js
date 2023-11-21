import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import itemsSlice from "./itemsSlice";

export const store=configureStore({
    reducer:{
        user:userSlice,
        itemsSlice
    }
})