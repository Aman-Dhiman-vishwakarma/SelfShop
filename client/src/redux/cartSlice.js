import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setAddToCart: (state, action) => {
      state.cart = action.payload;
    },
    addInCart: (state, action) => {
        state.cart.push(action.payload);
      },
    deleteCartProduct: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
  },
});

export const { setAddToCart, deleteCartProduct, addInCart } = cartSlice.actions;
export default cartSlice;
