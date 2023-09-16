import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const login = createAsyncThunk(
    'user/login',
    async (data) =>{
        const res = await customAxios.post('login', data)
        return res

    }
)

export const register = createAsyncThunk(
    'user/register',
    async (data) =>{
        const res = await customAxios.post('register', data);
        console.log(res);
        return res
    }
)

export const getUser = createAsyncThunk(
    'users/getUsers',
    async () =>{
        const res  = await customAxios.get('users')
        return res
    }
)
