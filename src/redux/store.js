import {configureStore} from "@reduxjs/toolkit";
import houseReducer from "./houseSlice"
import userReducer from "./userSlice"


export const store = configureStore({
    reducer:{
        houses: houseReducer,
        user : userReducer
    }
})