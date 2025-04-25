import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name:"admin",
    initialState:{
        editeble:null
    },
    reducers:{
        setEditeble:(state, action)=>{
            state.editeble = action.payload
         },
    }
});

export const {setEditeble} = adminSlice.actions
export default adminSlice;