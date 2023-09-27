import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getHouses = createAsyncThunk(
    'houses/getHouses',
    async () =>{
        const res  = await axios.get('http://localhost:5000/houses')
        return res.data
    }
)
export const addHouses = createAsyncThunk(
    'houses/addHouses',
    async (data) =>{
        await axios.post('http://localhost:5000/houses',data)
        const res  = await axios.get('http://localhost:5000/houses')
        return res.data
    }
)
export const deleteHouses = createAsyncThunk(
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
export const getHouseById = createAsyncThunk(
    'house/getHouse',
    async (id) =>{
        return await axios.get(`http://localhost:5000/houses/${id}`)
    }
)
export const handleSearch = createAsyncThunk(
    'houses/searchHouses',
    async (data) =>{
        const { homeName, address, bath, bad, startTime, endTime } = data;
        const response = await axios.get(`http://localhost:5000/houses?address=${address}&homeName=${homeName}&bath=${bath}&bad=${bad}&startTime=${startTime}&endTime=${endTime}`);
        return response;
    }

)