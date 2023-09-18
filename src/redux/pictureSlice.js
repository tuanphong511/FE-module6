import {createSlice} from "@reduxjs/toolkit";
import {addPictures, getPicture} from "../services/pictureService";

const initialState = {
    houses: []
}
const pictureSlice =createSlice({
    name: 'pictures',
    initialState,
    reducers:{},
    extraReducers: builder => {
        builder.addCase(getPicture.fulfilled, (state, action) =>{
            state.pictures = action.payload.data
        })
        builder.addCase(addPictures.fulfilled, (state, action) =>{
            console.log("pictureSlice",action.payload)
            state.pictures.push(action.payload)
        })

    }
})
export default pictureSlice.reducer