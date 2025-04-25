import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
    name:"address",
    initialState:{
        chooseAddress:null,
    },
    reducers:{
        setChooseAddress:(state, action)=>{
           state.chooseAddress = action.payload
        }
    }
});

export const {setChooseAddress} = addressSlice.actions;
export default addressSlice;