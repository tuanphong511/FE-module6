import {createSlice} from "@reduxjs/toolkit";
import {getHouses,  addHouses, handleSearch} from "../services/houseService";

const initialState = {
    houses: []
}
const houseSlice =createSlice({
    name: 'houses',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getHouses.fulfilled, (state, action) =>{
            state.houses = action.payload
        })
        builder.addCase(handleSearch.fulfilled, (state, action) =>{
            state.houses = action.payload
        })
        builder.addCase(addHouses.fulfilled, (state, action) =>{
            state.houses = action.payload.data
        })

    }
})
export default houseSlice.reducer