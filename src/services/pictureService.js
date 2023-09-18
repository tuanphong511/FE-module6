import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getPicture = createAsyncThunk(
    'pictures/getPictures',
    async () =>{
        const res  = await axios.get('http://localhost:5000/pictures')
        return res
    }
)
export const addPictures = createAsyncThunk(
    'pictures/addPictures',
    async (data) =>{
        const res  = await axios.post('http://localhost:5000/pictures',data)
        return res.data
    }
)
export const deletePictures = createAsyncThunk(
    'houses/deleteHouses',
    async (id) =>{
        const res  = await axios.delete(`http://localhost:5000/houses/${id}`)
        return res
    }
)
export const updateHouses = createAsyncThunk(
    'houses/updateHouses',
    async (id) =>{
        const res  = await axios.put(`http://localhost:5000/houses/${id}`)
        return res
    }
)

