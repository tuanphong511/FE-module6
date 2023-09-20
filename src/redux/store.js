import {configureStore} from "@reduxjs/toolkit";
import houseReducer from "./houseSlice"
import userReducer from "./userSlice"
import pictureReducer from "./userSlice"


export const store = configureStore({
    reducer:{
        pictures: pictureReducer,
        houses: houseReducer,
        user : userReducer
    }
})