import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getOrder = createAsyncThunk(
    'orders/getOrders',
    async () =>{
        const res  = await axios.get('http://localhost:5000/orders')
        return res
    }
)
export const addOrders = createAsyncThunk(
    'orders/addOrders',
    async (data) =>{
        const res  = await axios.post('http://localhost:5000/orders',data)
        return res.data
    }
)
export const deletePictures = createAsyncThunk(
    'orders/deleteOrders',
    async (id) =>{
        const res  = await axios.delete(`http://localhost:5000/orders/${id}`)
        return res
    }
)
export const updateOrders = createAsyncThunk(
    'orders/updateOrders',
    async (id) =>{
        const res  = await axios.put(`http://localhost:5000/orders/${id}`)
        return res
    }
)

