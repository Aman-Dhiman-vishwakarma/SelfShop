import { createSlice } from "@reduxjs/toolkit";

const sectionFilterSlice = createSlice({
    name:"sectionfilter",
    initialState:{
        firstC:null,
        secondC:null,
        thirdC:null,
        query:null
    },
    reducers:{
        setvalues:(state, action)=>{
           state.firstC = action.payload.top
           state.secondC = action.payload.second
           state.thirdC = action.payload.third  
        },
        setQuery:(state, action)=>{
          state.query = action.payload
        }
    }
});

export const {setvalues, setQuery} = sectionFilterSlice.actions;
export default sectionFilterSlice;