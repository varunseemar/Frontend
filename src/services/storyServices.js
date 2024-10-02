import axios from 'axios'
import {BACKEND_URL} from '../utils/constants'

export const postStory = async ({formState,username,token})=>{
    try{
        const response = await axios.post(`${BACKEND_URL}/story/Post`, {
            formState,
            username,
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    catch(err){
        throw new Error(err.response.data)
    }
}

export const updateStory = async ({formState,username,token,editUserStoryId})=>{
    try{
        const response = await axios.put(`${BACKEND_URL}/story/edit/${editUserStoryId}`, {
            formState,
            username,
        }, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
    catch(err){
        throw new Error(err.response.data)
    }
}


