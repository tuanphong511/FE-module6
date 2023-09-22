import {createSlice} from "@reduxjs/toolkit";
import {getHouses,  addHouses} from "../services/houseService";

const initialState = {
    houses: []
}
const houseSlice =createSlice({
    name: 'houses',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getHouses.fulfilled, (state, action) =>{
            state.houses = action.payload.data
        })
        builder.addCase(addHouses.fulfilled, (state, action) =>{
            state.houses = action.payload.data
        })

    }
})
export default houseSlice.reducer