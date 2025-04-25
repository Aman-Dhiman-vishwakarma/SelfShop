import {createSlice} from "@reduxjs/toolkit";
const quantitySlice = createSlice({
    name:"quantity",
    initialState:{
        value:1,
        selectedSize:null
    },
    reducers:{
        incriseQuantity:(state)=>{
           state.value++;
        },
        dicriseQuantity:(state)=>{
            if (state.value > 1) {
                state.value--;
            }
        },
        resetQuantity:(state, action)=>{
            state.value = 1;
         },
        sizeSelect:(state, action)=>{
            state.selectedSize = action.payload;
         }
    }
});

export const {incriseQuantity, dicriseQuantity, sizeSelect, resetQuantity} = quantitySlice.actions;
export default quantitySlice;