import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"product",
    initialState:{
        allProducts:null
    },
    reducers:{
        setAllProducts:(state, action)=>{
            state.allProducts = action.payload
         },
    }
});

export const {setAllProducts} = productSlice.actions
export default productSlice;