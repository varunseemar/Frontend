import React from 'react'
import axios from 'axios'
import {BACKEND_URL} from '../utils/constants'
export const register = async ({username,password})=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/auth/Register`,{
            username,
            password
        },{
            headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    }
    catch(err){
        throw new Error(err.response.data)
    }
}

export const login = async ({username,password})=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/auth/Login`,{
            username,
            password
        },{
            headers : {
            'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response;
    }
    catch(err){
        throw new Error(err.response.data)
    }
}

export const loadUser = async ({username})=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/auth/Load/${username}`);
        return response;
    }
    catch(err){
        throw new Error(err.response.data)
    }
}