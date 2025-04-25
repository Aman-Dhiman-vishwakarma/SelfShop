import { createSlice } from "@reduxjs/toolkit";

const slidesSlice = createSlice({
    name:"slides",
    initialState:{
        slideImages:[]
    },
    reducers:{
        setSlides:(state, action)=>{
            state.slideImages = action.payload          
         },
        setSingleSlide:(state, action) => {
            state.slideImages = [...state.slideImages, action.payload]
        } 
        
    }
});

export const {setSlides, setSingleSlide} = slidesSlice.actions;
export default slidesSlice;