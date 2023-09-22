import {configureStore} from "@reduxjs/toolkit";
import houseReducer from "./houseSlice"
import userReducer from "./userSlice"
import pictureReducer from "./pictureSlice"
import orderReducer from "./orderSlice"


export const store = configureStore({
    reducer:{
        orders: orderReducer,
        pictures: pictureReducer,
        houses: houseReducer,
        user : userReducer
    }
})