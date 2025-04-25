import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const orderSlice = createSlice({
    name:"order",
    initialState:{
        orderSummery:null,
        totalamount:0,
        totalitems:0,
        userOrders:[]
    },
    reducers:{
        setOrderSummery:(state, action) => {
           state.orderSummery = [...action.payload]
        },
        setSingleOrderSummery:(state, action) => {
            state.orderSummery = [{productId:action.payload.singleProduct, quantity:action.payload.value, productSizeOrConfigretion:action.payload.size }]
            console.log(state.orderSummery)
        },
        setTotleAmountItems:(state, action)=>{
            state.totalamount = action.payload.totalamount;
            state.totalitems = action.payload.totalitems;
        },
        setUserOrders:(state, action) => {
            state.userOrders = action.payload
            console.log(state.userOrders)
        },
        setOrderSummeryToN:(state, action) => {
            state.orderSummery = null
        }
    }

});

export const {setOrderSummery, setSingleOrderSummery, setTotleAmountItems, setUserOrders, setOrderSummeryToN} = orderSlice.actions;
export default orderSlice;
