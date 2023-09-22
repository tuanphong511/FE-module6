import {createSlice} from "@reduxjs/toolkit";
import {addPictures, getPicture} from "../services/pictureService";
import {addOrders, getOrder} from "../services/orderService";

const initialState = {
    orders: []
}
const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.orders = action.payload.data
        })
        builder.addCase(addOrders.fulfilled, (state, action) => {
            state.orders = action.payload.data
        })

    }
})
export default orderSlice.reducer