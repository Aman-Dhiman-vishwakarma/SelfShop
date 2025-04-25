import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    checkMail:null,
  },
  reducers:{
    setCurrentUser:(state, action)=> {
        state.currentUser = action.payload
    },
    setCheckMail:(state, action)=> {
      state.checkMail = action.payload
  }
  }
});
export const {setCurrentUser, setCheckMail} = authSlice.actions;
export default authSlice;
